// src/services/chat.js
import api from "./api";

export const createConversation = (data) => api.post("/chat/conversations", data);
