// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database to ensure they still exist and aren't blocked
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });
    
    if (user.isBlocked) return res.status(403).json({ message: 'Account is blocked' });
    
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(500).json({ message: 'Authentication error' });
  }
};

// Role-based middleware
exports.hasRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Authentication required' });
  if (req.user.role !== role) return res.status(403).json({ message: 'Insufficient permissions' });
  next();
};

// Multiple roles middleware
exports.hasAnyRole = (roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Authentication required' });
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Insufficient permissions' });
  next();
};

// Admin or owner middleware
exports.isAdminOrOwner = (resourceUserId) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Authentication required' });
  if (req.user.role === 'admin' || req.user.id === resourceUserId) {
    next();
  } else {
    res.status(403).json({ message: 'Insufficient permissions' });
  }
};