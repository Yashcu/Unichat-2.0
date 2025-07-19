// src/pages/TasksPage.jsx
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTaskStore } from '../store/useTaskStore';
import CreateTaskForm from '../components/CreateTaskForm';
import CreateAssignmentForm from '../components/CreateAssignmentForm';
import useAuth from '../hooks/useAuth';

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

TaskItem.propTypes = {
    task: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        type: PropTypes.string,
        attachments: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired
};

const TasksPage = () => {
  const { tasks, loading, error, fetchTasks, toggleTaskComplete, removeTask, uploadTaskAttachment } = useTaskStore();
  const { user } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="p-4 bg-white rounded-lg shadow h-full overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">
        {user.role === 'faculty' ? 'My Tasks & Assignments' : 'My Tasks'}
      </h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-6">
        {user.role === 'faculty' ? (
            <CreateAssignmentForm onAssignmentCreated={fetchTasks} />
        ) : (
            <CreateTaskForm onTaskCreated={fetchTasks} />
        )}
      </div>

      <h2 className="text-xl font-bold mb-4 border-t pt-4">Task List</h2>

      {loading && <p>Loading tasks...</p>}

      {!loading && (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={toggleTaskComplete}
              onDelete={removeTask}
              onUpload={uploadTaskAttachment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksPage;
