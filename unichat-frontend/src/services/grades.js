// src/services/grades.js
import api from './api';

export const getMyGrades = () => api.get('/grades/my-grades');

export const addOrUpdateGrade = (gradeData) => api.post('/grades', gradeData);
