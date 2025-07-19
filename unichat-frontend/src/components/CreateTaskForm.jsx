// src/components/CreateTaskForm.jsx
import React, { useState } from 'react';
import { createTask } from '../services/tasks';

const CreateTaskForm = ({ onTaskCreated }) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!title.trim()) {
            setError('Task title cannot be empty.');
            return;
        }
        try {
            await createTask({ title });
            setTitle('');
            if (onTaskCreated) {
                onTaskCreated(); // Notify parent component that a task was created
            }
        } catch (err) {
            setError('Failed to create task.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What do you need to do?"
                className="border rounded-md p-2 w-full"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md self-end">
                Add Task
            </button>
        </form>
    );
};

export default CreateTaskForm;
