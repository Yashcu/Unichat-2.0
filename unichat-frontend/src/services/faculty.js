// src/services/faculty.js
import api from './api';

export const getFacultyDashboardStats = () => api.get('/faculty/dashboard');
export const getAllStudents = () => api.get('/faculty/students');
export const createAssignment = (assignmentData) => api.post('/faculty/assignments', assignmentData);
