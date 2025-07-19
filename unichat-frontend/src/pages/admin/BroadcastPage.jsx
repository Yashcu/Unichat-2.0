// src/pages/admin/BroadcastPage.jsx
import React, { useState } from 'react';
import { sendBroadcast } from '../../services/admin';

const BroadcastPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState({ message: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ message: '', type: '' });
        if (!title.trim() || !description.trim()) {
            setStatus({ message: 'Title and message cannot be empty.', type: 'error' });
            return;
        }
        try {
            await sendBroadcast({ title, description });
            setStatus({ message: 'Broadcast sent successfully!', type: 'success' });
            setTitle('');
            setDescription('');
        } catch {
            setStatus({ message: 'Failed to send broadcast.', type: 'error' });
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow h-full">
            <h1 className="text-2xl font-bold mb-4">Send Broadcast Message</h1>
            <p className="text-gray-600 mb-6">This message will appear as a global event on every user&apos;s calendar.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., University Holiday Announcement"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your announcement details here..."
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Send Broadcast
                </button>
            </form>

            {status.message && (
                <p className={`mt-4 text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {status.message}
                </p>
            )}
        </div>
    );
};

export default BroadcastPage;
