// src/services/calendar.js
import api from './api';

export const getEvents = () => api.get('/calendar');
export const createEvent = (eventData) => api.post('/calendar', eventData);
export const deleteEvent = (id) => api.delete(`/calendar/${id}`);