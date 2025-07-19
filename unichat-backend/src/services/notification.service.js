// src/services/notification.service.js
const Notification = require('../models/Notification');
const { io } = require('../server'); // We need the io instance to send real-time alerts

const createNotification = async (userId, message, link) => {
    try {
        const notification = new Notification({
            user: userId,
            message,
            link
        });
        await notification.save();

        // Emit a real-time event to the specific user
        io.to(userId.toString()).emit('new_notification', notification);

    } catch (error) {
        console.error('Error creating notification:', error);
    }
};

module.exports = { createNotification };
