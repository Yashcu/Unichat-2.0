// src/controllers/user.controller.js
const Task = require('../models/Task');
const Event = require('../models/Event');

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
