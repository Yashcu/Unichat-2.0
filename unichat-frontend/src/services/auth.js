// src/services/auth.js
import api from "./api";

export const register = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);
export const getProfile = (token) =>
  api.get("/user/me", {
    headers: { Authorization: `Bearer ${token}` },
  });