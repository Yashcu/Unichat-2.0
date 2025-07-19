// src/routes/calendar.routes.js
const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendar.controller');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, calendarController.getEvents);
router.post('/', isAuthenticated, calendarController.createEvent);
router.delete('/:id', isAuthenticated, calendarController.deleteEvent);

module.exports = router;