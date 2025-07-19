// src/context/ChatProvider.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useSocket } from './SocketProvider';
import PropTypes from 'prop-types';
import api from '../services/api';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const socket = useSocket();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadConversations = async () => {
        try {
          const response = await api.get('/chat/conversations');
          setConversations(response.data);
        } catch (error) {
          console.error('Error loading conversations:', error);
        }
    };
    loadConversations();
  }, []);

  useEffect(() => {
    if (!socket) return;
    const handleReceiveMessage = (message) => {
      if (message.conversation === activeConversation) {
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
      try {
        const response = await api.get(`/chat/messages/${activeConversation}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error loading messages:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, [activeConversation]);

  const sendMessage = (content, conversationId, isAnonymous) => {
    api.post('/chat/messages', { content, conversationId, isAnonymous })
      .catch(err => console.error("Send message error:", err));
  };

  const selectConversation = (conversationId) => {
    if (socket) {
      if (activeConversation) socket.emit('leaveRoom', activeConversation);
      socket.emit('joinRoom', conversationId);
      setActiveConversation(conversationId);
    }
  };

  const value = {
    conversations,
    activeConversation,
    setActiveConversation: selectConversation,
    messages,
    loading,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

ChatProvider.propTypes = {
    children: PropTypes.node.isRequired
};
