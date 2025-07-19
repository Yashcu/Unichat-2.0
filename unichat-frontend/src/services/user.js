// src/services/user.js
import api from './api';

export const getDashboardStats = () => api.get('/user/dashboard');

export const searchUsers = (query) => api.get(`/user/search?search=${query}`);
