import express from 'express';
import { register, login, getProfile } from '../controllers/auth.controller.js';
import { validateRegistration } from '../middleware/validator.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);

export default router;