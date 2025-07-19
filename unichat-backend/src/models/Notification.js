// src/models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user who receives the notification
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    link: { type: String }, // Optional link to redirect when clicked
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
