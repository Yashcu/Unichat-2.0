// src/controllers/ai.controller.js
const aiService = require('../services/ai.service');
const Message = require('../models/Message');

// Summarize a chat conversation
exports.summarizeConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    // Fetch all messages for the conversation
    const messages = await Message.find({ conversation: conversationId })
        .populate('sender', 'name')
        .sort({ createdAt: 'asc' });

    if (messages.length === 0) {
        return res.json({ summary: "This conversation has no messages to summarize." });
    }
    
    // Get the summary from the AI service
    const summary = await aiService.summarizeChat(messages);

    res.json({ summary });
  } catch (err) {
    console.error("Summarization Controller Error:", err);
    res.status(500).json({ message: 'Failed to summarize conversation.' });
  }
};