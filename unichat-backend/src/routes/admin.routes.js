const express = require('express');
const router = express.Router();
const { isAuthenticated, hasRole } = require('../middleware/auth');
const User = require('../models/User');
const Log = require('../models/Log');
const Event = require('../models/Event');

// Admin dashboard overview
router.get('/dashboard', isAuthenticated, hasRole('admin'), async (req, res) => {
  try {
    const stats = {
      totalUsers: await User.countDocuments(),
      students: await User.countDocuments({ role: 'student' }),
      faculty: await User.countDocuments({ role: 'faculty' }),
      admins: await User.countDocuments({ role: 'admin' }),
      activeUsers: await User.countDocuments({ lastActive: { $gte: new Date(Date.now() - 24*60*60*1000) } }),
      totalEvents: await Event.countDocuments(),
      globalEvents: await Event.countDocuments({ isGlobal: true })
    };
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// View system logs
router.get('/logs', isAuthenticated, hasRole('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 50, action, user } = req.query;
    const query = {};
    
    if (action) query.action = action;
    if (user) query.user = user;
    
    const logs = await Log.find(query)
      .populate('user', 'name email role')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Log.countDocuments(query);
    
    res.json({
      logs,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Send global broadcast message
router.post('/broadcast', isAuthenticated, hasRole('admin'), async (req, res) => {
  try {
    const { message, title, type } = req.body;
    
    // Create a global event for the broadcast
    const broadcastEvent = new Event({
      title: title || 'System Announcement',
      description: message,
      type: type || 'custom',
      date: new Date(),
      isGlobal: true,
      createdBy: req.user.id
    });
    
    await broadcastEvent.save();
    
    // Log the broadcast
    await Log.create({
      user: req.user.id,
      action: 'broadcast_message',
      resource: 'system',
      details: { message, title, type }
    });
    
    res.json({ message: 'Broadcast sent successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Publish global calendar event
router.post('/event', isAuthenticated, hasRole('admin'), async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      isGlobal: true,
      createdBy: req.user.id
    });
    
    await event.save();
    
    // Log the event creation
    await Log.create({
      user: req.user.id,
      action: 'create_global_event',
      resource: 'event',
      resourceId: event._id,
      details: { title: event.title, type: event.type }
    });
    
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all users (admin only)
router.get('/users', isAuthenticated, hasRole('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;
    const query = {};
    
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } }
      ];
    }
    
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await User.countDocuments(query);
    
    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Change user role
router.patch('/users/:id/role', isAuthenticated, hasRole('admin'), async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Log the role change
    await Log.create({
      user: req.user.id,
      action: 'change_user_role',
      resource: 'user',
      resourceId: user._id,
      details: { oldRole: user.role, newRole: role }
    });
    
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Block/unblock user
router.patch('/users/:id/block', isAuthenticated, hasRole('admin'), async (req, res) => {
  try {
    const { isBlocked } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked },
      { new: true }
    ).select('-password');
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Log the block action
    await Log.create({
      user: req.user.id,
      action: isBlocked ? 'block_user' : 'unblock_user',
      resource: 'user',
      resourceId: user._id,
      details: { userId: user._id, userName: user.name }
    });
    
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 