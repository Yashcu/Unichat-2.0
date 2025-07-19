// src/routes/tasks.routes.js
const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks.controller');
const { isAuthenticated } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { body, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/', isAuthenticated, tasksController.getTasks);
router.post('/',
    isAuthenticated,
    [ body('title').not().isEmpty().withMessage('Title is required') ], // Validation rule
    validateRequest,
    tasksController.createTask
);
router.put('/:id', isAuthenticated, tasksController.updateTask);
router.delete('/:id', isAuthenticated, tasksController.deleteTask);
router.post('/:id/upload', isAuthenticated, upload, tasksController.uploadAttachment);

module.exports = router;
