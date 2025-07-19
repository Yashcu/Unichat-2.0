// src/routes/ai.routes.js
const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');
const { isAuthenticated } = require('../middleware/auth');

router.get('/summarize/chat/:conversationId', isAuthenticated, aiController.summarizeConversation);

module.exports = router;