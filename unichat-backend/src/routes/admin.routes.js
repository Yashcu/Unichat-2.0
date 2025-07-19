// src/routes/admin.routes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

router.get('/dashboard', isAuthenticated, isAdmin, adminController.getDashboardStats);
router.post('/users/create', isAuthenticated, isAdmin, adminController.createUser);
router.get('/users', isAuthenticated, isAdmin, adminController.getAllUsers);
router.get('/logs', isAuthenticated, isAdmin, adminController.getSystemLogs);
router.post('/broadcast', isAuthenticated, isAdmin, adminController.sendBroadcast);

module.exports = router;
