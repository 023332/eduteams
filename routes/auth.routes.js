const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateRegistration, validateLogin } = require('../middleware/validator');

// Registration route
router.post('/register', validateRegistration, authController.register);

// Login route
router.post('/login', validateLogin, authController.login);

module.exports = router;