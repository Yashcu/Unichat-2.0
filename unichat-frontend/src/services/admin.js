// src/services/admin.js
import api from './api';

export const getAllUsers = () => api.get('/admin/users');
export const getSystemLogs = () => api.get('/admin/logs');
export const sendBroadcast = (data) => api.post('/admin/broadcast', data);
export const getAdminDashboardStats = () => api.get('/admin/dashboard');
