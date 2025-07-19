// src/pages/admin/SystemLogsPage.jsx
import React, { useState, useEffect } from 'react';
import { getSystemLogs } from '../../services/admin';

const SystemLogsPage = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await getSystemLogs();
                setLogs(response.data);
            } catch {
                setError('Failed to fetch system logs.');
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    if (loading) return <div>Loading logs...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="p-4 bg-white rounded-lg shadow h-full">
            <h1 className="text-2xl font-bold mb-4">System Activity Logs</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 text-left">Admin User</th>
                            <th className="py-2 px-4 text-left">Action</th>
                            <th className="py-2 px-4 text-left">Details</th>
                            <th className="py-2 px-4 text-left">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map(log => (
                            <tr key={log._id} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4">{log.user?.name || 'System'}</td>
                                <td className="py-2 px-4 font-mono text-sm">{log.action}</td>
                                <td className="py-2 px-4">{log.details}</td>
                                <td className="py-2 px-4">{new Date(log.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SystemLogsPage;
