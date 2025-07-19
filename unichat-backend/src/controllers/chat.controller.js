// src/controllers/chat.controller.js
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

// Get all conversations a user is part of
exports.getUserConversations = async (req, res) => {
    try {
      const conversations = await Conversation.find({ participants: req.user.id })
        .populate("participants", "name email role"); // Populate with user details
      res.json(conversations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

// Get messages for a specific conversation
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversation: req.params.conversationId })
      .populate('sender', 'name role')
      .sort({ createdAt: 'asc' });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
};

// Send a new message
exports.sendMessage = async (req, res) => {
    // We now accept 'isAnonymous' from the frontend
    const { conversationId, content, isAnonymous } = req.body;
    try {
      const message = new Message({
        conversation: conversationId,
        sender: req.user.id,
        content: content,
        isAnonymous: !!isAnonymous, // Ensure it's a boolean
      });
      
      const savedMessage = await message.save();
      
      const populatedMessage = await savedMessage.populate('sender', 'name role');

      // Emit the message to all clients in the room (conversation)
      req.io.to(conversationId).emit('receiveMessage', populatedMessage);
      
      // Respond to the original sender with the populated message
      res.status(201).json(populatedMessage);

    } catch (err) {
      console.error("Error in sendMessage:", err); // More detailed error logging
      res.status(500).json({ message: 'Error sending message', error: err.message });
    }
};

exports.createConversation = async (req, res) => {
    const { participants, name, type } = req.body; // Participants should be an array of User IDs
  
    if (!participants || participants.length < 2) {
      return res.status(400).json({ message: 'A conversation requires at least 2 participants.' });
    }
  
    try {
      // Also include the person creating the chat if they aren't in the list
      if (!participants.includes(req.user.id)) {
          participants.push(req.user.id);
      }
  
      const conversation = await Conversation.create({ 
          participants,
          name: type === 'group' ? name : null, // Only groups have names
          type: type || 'one-to-one'
       });
      
      const populatedConversation = await conversation.populate("participants", "name email role");
  
      res.status(201).json(populatedConversation);
    } catch (err) {
      res.status(500).json({ message: 'Error creating conversation', error: err.message });
    }
  };