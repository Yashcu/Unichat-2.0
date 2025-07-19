const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notifications.controller');
const { isAuthenticated } = require('../middleware/auth');

router.post('/read-all', isAuthenticated, notificationsController.markAllAsRead);

module.exports = router;
