// src/context/ChatProvider.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import useAuth from '../hooks/useAuth';
import api from '../services/api'; // Import your api service

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [socket, setSocket] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initialize socket connection
  useEffect(() => {
    if (user && token) {
      const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
        auth: {
          token
        }
      });

      newSocket.on('connect', () => {
        console.log('Connected to chat server');
      });

      newSocket.on('receiveMessage', (message) => {
        // Only add the message if it belongs to the active conversation
        if (message.conversation === activeConversation) {
            setMessages(prev => [...prev, message]);
        }
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from chat server');
      });

      setSocket(newSocket);
      loadConversations();

      return () => {
        newSocket.close();
      };
    }
  }, [user, token, activeConversation]);

  // Send message
  const sendMessage = (content, conversationId) => {
    if (socket && content.trim()) {
      const message = {
        content,
        conversationId,
        sender: user.id,
        timestamp: new Date()
      };
      // We no longer need to optimistically update the UI here
      // because the server will broadcast the message back to us
      socket.emit('sendMessage', {
        roomId: conversationId,
        message
      });
    }
  };

  // Join conversation
  const joinConversation = (conversationId) => {
    if (socket) {
      socket.emit('joinRoom', conversationId);
      setActiveConversation(conversationId);
      loadMessages(conversationId); // Load messages when joining
    }
  };

  // Load conversations
  const loadConversations = async () => {
    setLoading(true);
    try {
      const response = await api.get('/chat/conversations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConversations(response.data);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load messages for a conversation
  const loadMessages = async (conversationId) => {
    setLoading(true);
    try {
        const response = await api.get(`/chat/messages/${conversationId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
      setMessages(response.data);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    socket,
    conversations,
    activeConversation,
    messages,
    loading,
    sendMessage,
    joinConversation,
    loadConversations,
    loadMessages,
    setActiveConversation: joinConversation, // Use joinConversation to set active conversation
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};