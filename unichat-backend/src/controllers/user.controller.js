// src/controllers/user.controller.js
const Task = require('../models/Task');
const Event = require('../models/Event');
const User = require('../models/User');
const Notification = require('../models/Notification');

// Get statistics for the logged-in user's dashboard
exports.getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.id;

        // We run these database queries in parallel for better performance
        const [activeTaskCount, upcomingEventCount] = await Promise.all([
            // Count tasks that are not yet completed
            Task.countDocuments({ assignedTo: userId, isCompleted: false }),

            // Count events from today onwards
            Event.countDocuments({
                $or: [{ createdBy: userId }, { attendees: userId }, { isGlobal: true }],
                date: { $gte: new Date() }
            })
        ]);

        res.json({
            tasks: activeTaskCount,
            upcomingEvents: upcomingEventCount,
            recentMessages: 0 // Placeholder for now
        });

    } catch (err) {
        console.error("Dashboard Stats Error:", err);
        res.status(500).json({ message: 'Error fetching dashboard statistics' });
    }
};

exports.searchUsers = async (req, res) => {
    try {
        const searchQuery = req.query.search || '';
        if (!searchQuery) {
            return res.json([]);
        }

        const users = await User.find({
            // Search by name or email, case-insensitive
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { email: { $regex: searchQuery, $options: 'i' } }
            ],
            // Exclude the user who is performing the search
            _id: { $ne: req.user.id }
        })
        .select('name email') // Only return necessary fields
        .limit(10); // Limit results for performance

        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error searching for users' });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.id })
            .sort({ createdAt: 'desc' })
            .limit(20); // Get the 20 most recent notifications
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching notifications' });
    }
};
