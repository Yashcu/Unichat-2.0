// store/useTaskStore.js
import { create } from 'zustand';
import { getTasks, createTask, updateTask, deleteTask, uploadAttachment } from '../services/tasks';
import { io } from 'socket.io-client';

let socket;
const getSocket = () => {
    if (!socket) {
        const token = localStorage.getItem('token');
        if (token) {
            socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
                auth: { token }
            });

            socket.on('tasks_updated', () => {
                useTaskStore.getState().fetchTasks();
            });
        }
    }
    return socket;
};

getSocket();

export const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getTasks();
      set({ tasks: response.data, loading: false });
    } catch {
      set({ error: 'Failed to fetch tasks.', loading: false });
    }
  },

  addTask: async (taskData) => {
    try {
      await createTask(taskData);
    } catch {
      set({ error: 'Failed to create task.' });
    }
  },

  toggleTaskComplete: async (task) => {
    try {
      await updateTask(task._id, { isCompleted: !task.isCompleted });
    } catch {
      set({ error: 'Failed to update task.' });
    }
  },

  removeTask: async (taskId) => {
    try {
        await deleteTask(taskId);
    } catch {
        set({ error: 'Failed to delete task.' });
    }
  },

  uploadTaskAttachment: async (taskId, file) => {
    const formData = new FormData();
    formData.append('attachment', file);
    try {
        await uploadAttachment(taskId, formData);
    } catch {
        set({ error: 'Failed to upload file.' });
    }
  }
}));
