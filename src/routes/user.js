const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// routes for environment
router.post('/register', userController.register);
router.post('/auth', userController.auth);

module.exports = router;
