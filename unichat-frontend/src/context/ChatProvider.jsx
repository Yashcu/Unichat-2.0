// src/context/ChatProvider.jsx
import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { io } from 'socket.io-client';
import useAuth from '../hooks/useAuth';
import api from '../services/api';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { user, token } = useAuth();
  const socketRef = useRef(null); // Use a ref to hold the socket instance
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Effect for connecting and disconnecting the socket
  useEffect(() => {
    if (token && user) {
      const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
        auth: { token, userId: user.id }
      });
      socketRef.current = newSocket;

      newSocket.on('connect', () => console.log(`--- FRONTEND: Socket connected with ID [${newSocket.id}] ---`));
      newSocket.on('disconnect', () => console.log('--- FRONTEND: Socket disconnected ---'));

      return () => {
        newSocket.disconnect();
      };
    }
  }, [token, user]); // This now only runs when the user logs in or out

  // Effect for loading conversations
  useEffect(() => {
    if (token && user) { // Ensure user and token exist before fetching
      const loadConversations = async () => {
        try {
          const response = await api.get('/chat/conversations');
          setConversations(response.data);
        } catch (error) {
          console.error('Error loading conversations:', error);
        }
      };
      loadConversations();
    }
  }, [token, user]); // This also only runs on login/logout

  // Effect for handling incoming messages
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const handleReceiveMessage = (message) => {
      if (message.conversation === activeConversation) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on('receiveMessage', handleReceiveMessage);
    return () => socket.off('receiveMessage', handleReceiveMessage);
  }, [activeConversation]); // Re-subscribe only when the active chat changes

  // Effect for loading messages for the active conversation
  useEffect(() => {
    if (!activeConversation || !token) {
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
  }, [activeConversation, token]);

  const sendMessage = (content, conversationId, isAnonymous) => {
    api.post('/chat/messages', { content, conversationId, isAnonymous })
      .catch(err => console.error("Send message error:", err));
  };

  const selectConversation = (conversationId) => {
    const socket = socketRef.current;
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

export const useChat = () => useContext(ChatContext);
