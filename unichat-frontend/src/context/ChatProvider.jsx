// src/context/ChatProvider.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSocket } from './SocketProvider';
import api from '../services/api';
import useAuth from '../hooks/useAuth';

export const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const socket = useSocket();
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadConversations = useCallback(async () => {
    try {
      const response = await api.get('/chat/conversations');
      setConversations(response.data);
      // Automatically select the first conversation if none is active
      if (!activeConversation && response.data.length > 0) {
        setActiveConversation(response.data[0]);
      }
    } catch (err) {
      setError('Failed to load conversations.');
      console.error('Error loading conversations:', err);
    }
  }, [activeConversation]);

  useEffect(() => {
    if (user && socket) {
      loadConversations();
    }
  }, [user, socket, loadConversations]);

  useEffect(() => {
    if (!socket || !activeConversation) return;

    const handleReceiveMessage = (message) => {
      // Only add the message if it belongs to the active conversation
      if (message.conversation === activeConversation._id) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on('receiveMessage', handleReceiveMessage);
    return () => socket.off('receiveMessage', handleReceiveMessage);
  }, [socket, activeConversation]);

  useEffect(() => {
    if (!activeConversation) {
      setMessages([]);
      return;
    }

    const loadMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/chat/messages/${activeConversation._id}`);
        setMessages(response.data);
      } catch (err) {
        setError('Failed to load messages.');
        console.error('Error loading messages:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
    // Join the socket room for the active conversation
    socket.emit('joinRoom', activeConversation._id);

    return () => {
        // Leave the socket room when the component unmounts or the conversation changes
        if (activeConversation) {
            socket.emit('leaveRoom', activeConversation._id);
        }
    };
  }, [activeConversation, socket]);

  const sendMessage = (content, isAnonymous) => {
    if (!activeConversation) return;

    const messageData = {
      content,
      conversationId: activeConversation._id,
      isAnonymous
    };

    api.post('/chat/messages', messageData)
      .catch(err => console.error("Send message error:", err));
  };

  const selectConversation = (conversation) => {
    setActiveConversation(conversation);
  };

  const getConversationName = (convo) => {
    if (!convo || !user) return 'Chat';
    if (convo.name) return convo.name; // For group chats
    const otherParticipant = convo.participants.find(p => p._id !== user.id);
    return otherParticipant ? otherParticipant.name : 'Direct Message';
  };

  const value = {
    conversations,
    activeConversation,
    selectConversation,
    messages,
    loading,
    error,
    sendMessage,
    getConversationName
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

ChatProvider.propTypes = {
    children: PropTypes.node.isRequired
};