// src/routes/index.js
const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/admin', require('./admin.routes'));
router.use('/chat', require('./chat.routes'));
router.use('/tasks', require('./tasks.routes'));
router.use('/calendar', require('./calendar.routes'));
router.use('/ai', require('./ai.routes'));
router.use('/user', require('./user.routes'));

module.exports = router;
