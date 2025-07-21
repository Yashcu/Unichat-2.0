// src/components/CreateTaskForm.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createTask } from '../services/tasks';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { X } from 'lucide-react';

const CreateTaskForm = ({ onTaskCreated, onClose }) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!title.trim()) {
            setError('Task title cannot be empty.');
            return;
        }
        setLoading(true);
        try {
            await createTask({ title });
            setTitle('');
            if (onTaskCreated) {
                onTaskCreated();
            }
        } catch {
            setError('Failed to create task.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[200px]">
          <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-md bg-white rounded-xl shadow-lg border px-6 py-6 flex flex-col gap-5"
          >
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-gray-900 text-center">Create a New Task</h2>
              <hr className="my-1 border-gray-200" />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you need to do?"
              className="h-12 text-base px-4 py-2 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md transition"
              autoFocus
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-11 text-base font-semibold rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              {loading ? 'Adding Task...' : 'Add Task'}
            </Button>
          </form>
        </div>
    );
};

CreateTaskForm.propTypes = {
    onTaskCreated: PropTypes.func,
    onClose: PropTypes.func
};

export default CreateTaskForm;
