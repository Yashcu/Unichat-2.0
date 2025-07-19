// src/controllers/notifications.controller.js
const Notification = require('../models/Notification');

exports.markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { user: req.user.id, isRead: false },
            { $set: { isRead: true } }
        );
        res.status(200).json({ message: 'All notifications marked as read.' });
    } catch {
        res.status(500).json({ message: 'Error marking notifications as read.' });
    }
};
