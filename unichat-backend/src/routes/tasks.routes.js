// src/routes/tasks.routes.js
const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks.controller');
const { isAuthenticated } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', isAuthenticated, tasksController.getTasks);
router.post('/', isAuthenticated, tasksController.createTask);
router.put('/:id', isAuthenticated, tasksController.updateTask);
router.delete('/:id', isAuthenticated, tasksController.deleteTask);
router.post('/:id/upload', isAuthenticated, upload, tasksController.uploadAttachment);

module.exports = router;
