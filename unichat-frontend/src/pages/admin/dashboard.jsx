// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { getAdminDashboardStats } from '../../services/admin';
import { Link } from 'react-router-dom';

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
                    <QuickActionLink to="/admin/users" label="Manage Users" />
                    <QuickActionLink to="/admin/logs" label="View Logs" />
                    <QuickActionLink to="/admin/broadcast" label="Send Broadcast" />
                    <QuickActionLink to="/calendar" label="Manage Calendar" />
                </div>
            </div>
        </div>
    );
};

// Helper component for stat cards
const StatCard = ({ title, value, loading }) => (
    <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        {loading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse mt-1"></div>
        ) : (
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        )}
    </div>
);

// Helper component for quick action buttons
const QuickActionLink = ({ to, label }) => (
    <Link to={to} className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors text-center">
        <p className="text-sm font-medium text-gray-700">{label}</p>
    </Link>
);

export default AdminDashboard;
