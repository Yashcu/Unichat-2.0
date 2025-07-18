import React, { createContext, useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import useAuth from '../hooks/useAuth';

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
        setMessages(prev => [...prev, message]);
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from chat server');
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [user, token]);

  // Send message
  const sendMessage = (content, conversationId) => {
    if (socket && content.trim()) {
      const message = {
        content,
        conversationId,
        sender: user.id,
        timestamp: new Date()
      };

      socket.emit('sendMessage', {
        roomId: conversationId,
        message
      });

      // Optimistically add message to UI
      setMessages(prev => [...prev, message]);
    }
  };

  // Join conversation
  const joinConversation = (conversationId) => {
    if (socket) {
      socket.emit('joinRoom', conversationId);
      setActiveConversation(conversationId);
    }
  };

  // Load conversations
  const loadConversations = async () => {
    setLoading(true);
    try {
      // TODO: Fetch conversations from API
      const mockConversations = [
        { id: '1', name: 'CS101 Study Group', type: 'group', lastMessage: 'When is the exam?' },
        { id: '2', name: 'Prof. Smith', type: 'one-to-one', lastMessage: 'Assignment submitted' }
      ];
      setConversations(mockConversations);
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
      // TODO: Fetch messages from API
      const mockMessages = [
        { id: '1', content: 'Hello!', sender: 'user1', timestamp: new Date() },
        { id: '2', content: 'Hi there!', sender: 'user2', timestamp: new Date() }
      ];
      setMessages(mockMessages);
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
    setActiveConversation
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