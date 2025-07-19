// src/components/CreateTaskForm.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createTask } from '../services/tasks';
import { Button } from './ui/button';
import { Input } from './ui/input';

const CreateTaskForm = ({ onTaskCreated }) => {
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
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What do you need to do?"
            />
            <Button type="submit" disabled={loading}>
                {loading ? 'Adding Task...' : 'Add Task'}
            </Button>
        </form>
    );
};

CreateTaskForm.propTypes = {
    onTaskCreated: PropTypes.func
};

export default CreateTaskForm;
