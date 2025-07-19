// src/routes/faculty.routes.js
const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/faculty.controller');
const { isAuthenticated } = require('../middleware/auth');

// A simple middleware to check if the user is a faculty member
const isFaculty = (req, res, next) => {
    if (req.user && req.user.role === 'faculty') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Faculty only.' });
    }
};

router.get('/dashboard', isAuthenticated, isFaculty, facultyController.getDashboardStats);
router.get('/students', isAuthenticated, isFaculty, facultyController.getAllStudents);
router.post('/assignments', isAuthenticated, isFaculty, facultyController.createAssignment);

module.exports = router;
