// src/pages/TasksPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { getTasks, updateTask, deleteTask, uploadAttachment } from '../services/tasks';
import CreateTaskForm from '../components/CreateTaskForm';
import CreateAssignmentForm from '../components/CreateAssignmentForm'; // Import the new form
import useAuth from '../hooks/useAuth'; // Import useAuth to check role

// ... (TaskItem component remains the same)
const TaskItem = ({ task, onToggle, onDelete, onUpload }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onUpload(task._id, file);
        }
    };

    return (
        <div className={`p-3 rounded-md ${task.isCompleted ? 'bg-gray-100 text-gray-500' : 'bg-white border'}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input type="checkbox" checked={task.isCompleted} onChange={() => onToggle(task)} className="mr-3 h-5 w-5" />
                    <div>
                        <span className={task.isCompleted ? 'line-through' : ''}>{task.title}</span>
                        {task.type === 'assignment' && <span className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-1 ml-2">Assignment</span>}
                    </div>
                </div>
                <div>
                    <button onClick={() => fileInputRef.current.click()} className="text-sm text-blue-500 hover:underline mr-4">Upload File</button>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                    <button onClick={() => onDelete(task._id)} className="text-red-500 hover:text-red-700">Delete</button>
                </div>
            </div>
            {task.attachments && task.attachments.length > 0 && (
                <div className="mt-2 pl-8 text-sm">
                    <p className="font-semibold">Attachments:</p>
                    <ul className="list-disc list-inside">
                        {task.attachments.map((file, index) => <li key={index}>{file.replace('uploads\\', '')}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
};


const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const { user } = useAuth(); // Get the user's role

  // ... (fetchTasks, handleToggleComplete, handleDeleteTask, handleUpload functions are the same)
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

  const handleToggleComplete = async (task) => {
    try {
      await updateTask(task._id, { isCompleted: !task.isCompleted });
      fetchTasks();
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
        await deleteTask(taskId);
        fetchTasks();
    } catch (err) {
        setError('Failed to delete task.');
    }
  };

  const handleUpload = async (taskId, file) => {
    const formData = new FormData();
    formData.append('attachment', file);
    try {
        await uploadAttachment(taskId, formData);
        fetchTasks();
    } catch (err) {
        setError('Failed to upload file.');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow h-full overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">
        {user.role === 'faculty' ? 'My Tasks & Assignments' : 'My Tasks'}
      </h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-6">
        {/* Conditionally render the correct form based on user role */}
        {user.role === 'faculty' ? (
            <CreateAssignmentForm onAssignmentCreated={fetchTasks} />
        ) : (
            <CreateTaskForm onTaskCreated={fetchTasks} />
        )}
      </div>

      <h2 className="text-xl font-bold mb-4 border-t pt-4">Task List</h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggle={handleToggleComplete}
            onDelete={handleDeleteTask}
            onUpload={handleUpload}
          />
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
