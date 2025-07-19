// src/services/ai.js
import api from './api';

export const summarizeChat = (conversationId) => api.get(`/ai/summarize/chat/${conversationId}`);