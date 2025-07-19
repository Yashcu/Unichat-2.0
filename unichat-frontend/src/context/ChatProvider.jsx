// src/context/ChatProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSocket } from './SocketProvider';
import api from '../services/api';

export const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

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
    if (socket) {
        loadConversations();
    }
  }, [socket]);

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
    socket
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

ChatProvider.propTypes = {
    children: PropTypes.node.isRequired
};
