// src/services/tasks.js
import api from './api';

export const getTasks = () => api.get('/tasks');
export const createTask = (taskData) => api.post('/tasks', taskData);
export const updateTask = (id, updateData) => api.put(`/tasks/${id}`, updateData);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export const uploadAttachment = (id, formData) => {
    return api.post(`/tasks/${id}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
