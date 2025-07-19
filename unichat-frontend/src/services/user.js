// src/services/user.js
import api from './api';

export const getDashboardStats = () => api.get('/user/dashboard');

export const searchUsers = (query) => api.get(`/user/search?search=${query}`);

export const updateProfile = (profileData) => api.put('/user/profile', profileData);
export const changePassword = (passwordData) => api.post('/user/change-password', passwordData);
