// src/services/user.js
import api from './api';

export const getDashboardStats = () => api.get('/user/dashboard');
