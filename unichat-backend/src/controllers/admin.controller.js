// src/controllers/admin.controller.js
const User = require('../models/User');
const Log = require('../models/Log');
const Event = require('../models/Event');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  const { name, email, password, role, studentId } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Please provide name, email, password, and role.' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User with this email already exists.' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashed,
        role,
        studentId: role === 'student' ? studentId : null
    });

    // Create a log entry for this action
    await Log.create({
        user: req.user.id,
        action: 'admin_create_user',
        resource: 'user',
        resourceId: user._id,
        details: `Admin created new user: ${user.name} (${user.role})`
    });

    res.status(201).json({ message: 'User created successfully', user: { id: user._id, name, email, role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select('name email role createdAt') // Only fetch necessary fields for the list view
            .sort({ createdAt: 'desc' });
        res.json(users);
    } catch {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role, isBlocked } = req.body;

        // Prevent admin from accidentally changing their own role or blocking themselves
        if (id === req.user.id && (role !== 'admin' || isBlocked)) {
            return res.status(400).json({ message: "Admins cannot change their own role or block themselves." });
        }

        const updatedUser = await User.findByIdAndUpdate(id,
            { name, email, role, isBlocked },
            { new: true } // Return the updated document
        ).select('-password');

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        await Log.create({ user: req.user.id, action: 'admin_update_user', resourceId: updatedUser._id, details: `Updated user ${updatedUser.name}` });

        res.json(updatedUser);
    } catch {
        res.status(500).json({ message: 'Error updating user' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Prevent admin from deleting themselves
        if (id === req.user.id) {
            return res.status(400).json({ message: "Admins cannot delete their own account." });
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) return res.status(404).json({ message: 'User not found' });

        await Log.create({ user: req.user.id, action: 'admin_delete_user', resourceId: id, details: `Deleted user ${deletedUser.name}` });

        res.json({ message: 'User deleted successfully' });
    } catch {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

exports.getSystemLogs = async (req, res) => {
    try {
        const logs = await Log.find()
            .populate('user', 'name email')
            .sort({ createdAt: 'desc' })
            .limit(100);
        res.json(logs);
    } catch {
        res.status(500).json({ message: 'Error fetching system logs' });
    }
};

exports.sendBroadcast = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required.' });
        }

        // Create a global event that serves as the broadcast
        const broadcastEvent = new Event({
            title: title,
            description: description,
            type: 'custom',
            date: new Date(),
            isGlobal: true,
            createdBy: req.user.id
        });
        await broadcastEvent.save();

        // Log the broadcast action
        await Log.create({
            user: req.user.id,
            action: 'send_broadcast',
            resource: 'event',
            resourceId: broadcastEvent._id,
            details: `Admin sent broadcast: "${title}"`
        });

        res.status(200).json({ message: 'Broadcast sent successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Error sending broadcast', error: err.message });
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
        // Run queries in parallel for performance
        const [totalUsers, totalStudents, totalFaculty, totalEvents, recentLogs] = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ role: 'student' }),
            User.countDocuments({ role: 'faculty' }),
            Event.countDocuments(),
            Log.countDocuments({ createdAt: { $gte: new Date(Date.now() - 24*60*60*1000) } }) // Logs in last 24 hours
        ]);

        res.json({
            totalUsers,
            totalStudents,
            totalFaculty,
            totalEvents,
            recentLogs
        });
    } catch {
        res.status(500).json({ message: 'Error fetching admin dashboard stats' });
    }
};
