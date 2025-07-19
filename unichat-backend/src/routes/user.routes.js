// src/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { isAuthenticated } = require('../middleware/auth');

router.get('/dashboard', isAuthenticated, userController.getDashboardStats);

router.get('/search', isAuthenticated, userController.searchUsers);

router.get('/notifications', isAuthenticated, userController.getNotifications);

router.put('/profile', isAuthenticated, userController.updateProfile);

router.post('/change-password', isAuthenticated, userController.changePassword);

module.exports = router;
