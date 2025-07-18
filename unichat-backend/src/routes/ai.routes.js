const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const aiService = require('../services/ai.service');

// Summarize document
router.post('/summarize-doc', isAuthenticated, async (req, res) => {
  try {
    const { content, type } = req.body;
    const summary = await aiService.summarizeDocument(content, type);
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Extract tasks from chat or text
router.post('/extract-tasks', isAuthenticated, async (req, res) => {
  try {
    const { content } = req.body;
    const tasks = await aiService.extractTasks(content);
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Generate study plan
router.post('/study-plan', isAuthenticated, async (req, res) => {
  try {
    const { syllabus, preferences, timeframe } = req.body;
    const plan = await aiService.generateStudyPlan(syllabus, preferences, timeframe);
    res.json({ plan });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// AI assistant chatbot
router.post('/assistant', isAuthenticated, async (req, res) => {
  try {
    const { message, context } = req.body;
    const response = await aiService.chatAssistant(message, context, req.user.role);
    res.json({ response });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Summarize chat conversation
router.post('/summarize-chat', isAuthenticated, async (req, res) => {
  try {
    const { messages } = req.body;
    const summary = await aiService.summarizeChat(messages);
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 