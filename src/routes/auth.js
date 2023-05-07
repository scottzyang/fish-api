const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// routes for environment
router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
