const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const loginLimiter = require('../middleware/loginLimiter');

// Login route
router.route('/')
    .post(loginLimiter, authController.login);

// Register route
router.route('/register')
    .post(authController.register);

// Refresh route
router.route('/refresh')
    .get(authController.refresh);

// Logout route
router.route('/logout')
    .post(authController.logout);

module.exports = router;