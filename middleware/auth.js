const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const user = await User.findByPk(decoded.id);
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
};

module.exports = authMiddleware;