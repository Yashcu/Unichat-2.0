import api from "./api";

export const getMessages = (token, conversationId) =>
  api.get(`/chat/messages/${conversationId}`, { headers: { Authorization: `Bearer ${token}` } });

export const sendMessage = (token, data) =>
  api.post("/chat/send", data, { headers: { Authorization: `Bearer ${token}` } });

export const createConversation = (token, data) =>
  api.post("/chat/conversation", data, { headers: { Authorization: `Bearer ${token}` } });

export const summarizeConversation = (token, conversationId) =>
  api.get(`/chat/summarize/${conversationId}`, { headers: { Authorization: `Bearer ${token}` } });