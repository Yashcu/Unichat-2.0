const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const { isAuthenticated } = require('../middleware/auth');

router.post('/send', isAuthenticated, chatController.sendMessage);
router.get('/messages/:conversationId', isAuthenticated, chatController.getMessages);
router.post('/conversation', isAuthenticated, chatController.createConversation);
router.get('/summarize/:conversationId', isAuthenticated, chatController.summarizeConversation);
router.get('/conversations', isAuthenticated, chatController.getUserConversations);

module.exports = router;