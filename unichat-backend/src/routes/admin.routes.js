const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/dashboard', isAuthenticated, isAdmin, adminController.getDashboardStats);
router.post('/users/create',
    isAuthenticated,
    isAdmin,
    [
        body('name', 'Name is required').not().isEmpty(),
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
        body('role', 'Role is required').isIn(['student', 'faculty', 'admin'])
    ],
    validateRequest,
    adminController.createUser
);
router.get('/users', isAuthenticated, isAdmin, adminController.getAllUsers);
router.put('/users/:id', isAuthenticated, isAdmin, adminController.updateUser);
router.delete('/users/:id', isAuthenticated, isAdmin, adminController.deleteUser);
router.get('/logs', isAuthenticated, isAdmin, adminController.getSystemLogs);
router.post('/broadcast', isAuthenticated, isAdmin, adminController.sendBroadcast);

module.exports = router;
