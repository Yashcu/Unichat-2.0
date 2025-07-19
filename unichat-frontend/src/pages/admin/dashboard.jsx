// src/pages/admin/dashboard.jsx
import React, { useState, useEffect } from 'react';
import { getAdminDashboardStats } from '../../services/admin';
import StatCard from '../../components/dashboard/StatCard';
import QuickActionLink from '../../components/dashboard/QuickActionLink';

const AdminDashboard = () => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getAdminDashboardStats();
                setStats(response.data);
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={stats.totalUsers} loading={loading} />
                <StatCard title="Total Students" value={stats.totalStudents} loading={loading} />
                <StatCard title="Total Faculty" value={stats.totalFaculty} loading={loading} />
                <StatCard title="Total Events" value={stats.totalEvents} loading={loading} />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <QuickActionLink to="/admin/users" label="Manage Users" color="red" />
                    <QuickActionLink to="/admin/logs" label="View Logs" color="red" />
                    <QuickActionLink to="/admin/broadcast" label="Send Broadcast" color="red" />
                    <QuickActionLink to="/calendar" label="Manage Calendar" color="red" />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
