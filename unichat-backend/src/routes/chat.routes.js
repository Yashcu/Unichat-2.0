// src/routes/chat.routes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const { isAuthenticated } = require('../middleware/auth');

// Get all conversations for the logged-in user
router.get('/conversations', isAuthenticated, chatController.getUserConversations);

// Get all messages for a specific conversation
router.get('/messages/:conversationId', isAuthenticated, chatController.getMessages);

// Send a new message
router.post('/messages', isAuthenticated, chatController.sendMessage);

//  Create a new conversation
router.post('/conversations', isAuthenticated, chatController.createConversation);

module.exports = router;