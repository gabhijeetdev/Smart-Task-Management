const express = require('express');
const router = express.Router();
const { signup, login } = require('../controller/authController');

// User signup
router.post('/signup', signup);

// User login
router.post('/login', login);

module.exports = router;