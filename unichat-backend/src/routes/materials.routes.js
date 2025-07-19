const express = require('express');
const router = express.Router();
const materialsController = require('../controllers/materials.controller');
const { isAuthenticated } = require('../middleware/auth');
const upload = require('../middleware/upload'); // We reuse the same upload middleware

const isFaculty = (req, res, next) => {
    if (req.user && req.user.role === 'faculty') next();
    else res.status(403).json({ message: 'Access denied. Faculty only.' });
};

// Faculty can upload materials
router.post('/upload', isAuthenticated, isFaculty, upload, materialsController.uploadMaterial);

// Both students and faculty can view materials
router.get('/', isAuthenticated, materialsController.getMaterials);

module.exports = router;
