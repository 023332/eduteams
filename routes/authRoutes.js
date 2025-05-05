import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { validateRegistration, validateLogin } from '../utils/validationUtils.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', validateRegistration, registerUser);
router.post('/login', validateLogin, loginUser);

export default router;