import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerSchema } from '../middleware/validator.js';

export const register = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({ ...req.body, password: hashedPassword });
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};