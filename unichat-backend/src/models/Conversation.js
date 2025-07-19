// src/models/Conversation.js
const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  type: { type: String, enum: ['one-to-one', 'group'], default: 'one-to-one' },
  name: { type: String }, // For group chats
}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);