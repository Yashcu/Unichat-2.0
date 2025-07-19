// src/pages/TasksPage.jsx
import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/tasks';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await createTask({ title });
      setTitle('');
      fetchTasks(); // Refetch tasks to show the new one
    } catch (err) {
      setError('Failed to create task.');
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await updateTask(task._id, { isCompleted: !task.isCompleted });
      fetchTasks(); // Refetch to show the change
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
        await deleteTask(taskId);
        fetchTasks(); // Refetch to remove the task from the list
    } catch (err) {
        setError('Failed to delete task.');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow h-full">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      {error && <p className="text-red-500">{error}</p>}
      
      {/* Create Task Form */}
      <form onSubmit={handleCreateTask} className="flex mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow border rounded-l-md p-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded-r-md">Add Task</button>
      </form>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task._id} className={`flex items-center justify-between p-3 rounded-md ${task.isCompleted ? 'bg-gray-100 text-gray-500' : 'bg-white'}`}>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => handleToggleComplete(task)}
                className="mr-3 h-5 w-5"
              />
              <span className={task.isCompleted ? 'line-through' : ''}>
                {task.title}
              </span>
            </div>
            <button onClick={() => handleDeleteTask(task._id)} className="text-red-500 hover:text-red-700">
                Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;