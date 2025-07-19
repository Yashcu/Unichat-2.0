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
  } catch {
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
    const { participants, name, type } = req.body;

    if (!participants || participants.length === 0) {
        return res.status(400).json({ message: 'A conversation requires at least one other participant.' });
    }

    // Add the creator to the participants list
    const allParticipants = [...new Set([...participants, req.user.id.toString()])];

    try {
        // If it's a one-on-one chat, check if it already exists
        if (allParticipants.length === 2 && (!type || type === 'one-to-one')) {
            const existing = await Conversation.findOne({
                participants: { $all: allParticipants, $size: 2 }
            });
            if (existing) {
                // If it exists, just return the existing conversation
                const populated = await existing.populate("participants", "name email role");
                return res.status(200).json(populated);
            }
        }

        const conversation = await Conversation.create({
            participants: allParticipants,
            name: allParticipants.length > 2 ? name : null, // Only groups have names
            type: allParticipants.length > 2 ? 'group' : 'one-to-one'
        });

        const populatedConversation = await conversation.populate("participants", "name email role");
        res.status(201).json(populatedConversation);
    } catch (err) {
        res.status(500).json({ message: 'Error creating conversation', error: err.message });
    }
};
