// src/routes/grade.routes.js
const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/grade.controller');
const { isAuthenticated } = require('../middleware/auth');

// Middleware to check if user is faculty
const isFaculty = (req, res, next) => {
    if (req.user && req.user.role === 'faculty') next();
    else res.status(403).json({ message: 'Access denied. Faculty only.' });
};

// Faculty can add/update grades
router.post('/', isAuthenticated, isFaculty, gradeController.addOrUpdateGrade);

// Students can view their own grades
router.get('/my-grades', isAuthenticated, gradeController.getMyGrades);

module.exports = router;
