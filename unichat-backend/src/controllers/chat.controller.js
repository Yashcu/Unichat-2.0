const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

// Send a message
exports.sendMessage = async (req, res) => {
  const { conversationId, content, isAnonymous } = req.body;
  const sender = req.user.id;
  try {
    const message = await Message.create({
      conversation: conversationId,
      sender,
      content,
      isAnonymous,
    });
    const populatedMessage = await message.populate('sender', 'name role');
    
    // Use req.io which we attached in our middleware
    req.io.to(conversationId).emit('receiveMessage', populatedMessage);
    
    res.status(201).json(populatedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get messages for a conversation
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversation: req.params.conversationId })
      .populate('sender', 'name role')
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a conversation
exports.createConversation = async (req, res) => {
  const { participants, type, name } = req.body;
  try {
    const conversation = await Conversation.create({ participants, type, name });
    res.status(201).json(conversation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Summarize conversation using OpenAI
exports.summarizeConversation = async (req, res) => {
//   try {
//     const messages = await Message.find({ conversation: req.params.conversationId }).sort({ createdAt: 1 });
//     const text = messages.map(m => m.content).join('\n');
//     const summary = await getOpenAISummary(text);
//     res.json({ summary });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
    res.json({summary: "This is a mock summary."});
};

exports.getUserConversations = async (req, res) => {
    try {
      const conversations = await Conversation.find({ participants: req.user.id })
        .populate("participants", "name email role");
      res.json(conversations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };