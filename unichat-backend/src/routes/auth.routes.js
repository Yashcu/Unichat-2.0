// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { isAuthenticated } = require('../middleware/auth');

router.post('/login', authController.login);
router.get('/me', isAuthenticated, authController.getProfile);

module.exports = router;