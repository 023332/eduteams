import { user } from '../models/user.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { validateRegistration, validateLogin } from '../utils/validationUtils.js';
import { sendEmailConfirmation } from '../services/emailService.js';

const secretKey = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
    const { error } = validateRegistration(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { username, email, password } = req.body;
    const encryptedPassword = crypto.createCipher('aes-256-cbc', secretKey).update(password, 'utf8', 'hex');

    try {
        const newUser = await user.create({ username, email, password: encryptedPassword });
        await sendEmailConfirmation(newUser.email);
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};

export const loginUser = async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const decryptedPassword = crypto.createDecipher('aes-256-cbc', secretKey).update(user.password, 'hex', 'utf8');
        if (decryptedPassword !== password) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};