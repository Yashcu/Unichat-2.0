// src/services/notifications.js
import api from './api';

export const getNotifications = () => api.get('/user/notifications');
export const markAllNotificationsAsRead = () => api.post('/notifications/read-all');
