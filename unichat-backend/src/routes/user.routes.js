// src/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { isAuthenticated, hasRole } = require('../middleware/auth');

// Get current user profile
router.get('/me', isAuthenticated, userController.getProfile);

// Update current user profile
router.put('/me', isAuthenticated, userController.updateProfile);

// Get all users (admin only)
router.get('/', isAuthenticated, hasRole('admin'), userController.getAllUsers);

// Get user by ID (admin only)
router.get('/:id', isAuthenticated, hasRole('admin'), userController.getUserById);

// Update user by ID (admin only)
router.put('/:id', isAuthenticated, hasRole('admin'), userController.updateUserById);

// Delete user (admin only)
router.delete('/:id', isAuthenticated, hasRole('admin'), userController.deleteUser);

module.exports = router;