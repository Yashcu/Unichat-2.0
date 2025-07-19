// src/pages/faculty/dashboard.jsx
import React, { useState, useEffect } from 'react';
import { getFacultyDashboardStats } from '../../services/faculty';
import useAuth from '../../hooks/useAuth';
import StatCard from '../../components/dashboard/StatCard';
import QuickActionLink from '../../components/dashboard/QuickActionLink';

const FacultyDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getFacultyDashboardStats();
                setStats(response.data);
            } catch (error) {
                console.error("Failed to fetch faculty stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
                <p className="text-gray-600 mt-2">Here is your faculty summary.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Assignments Created" value={stats.assignmentsCreated} loading={loading} />
                <StatCard title="Events Created" value={stats.eventsCreated} loading={loading} />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <QuickActionLink to="/tasks" label="Manage Tasks" color="green" />
                    <QuickActionLink to="/calendar" label="Manage Calendar" color="green" />
                    <QuickActionLink to="/chat" label="Open Chat" color="green" />
                </div>
            </div>
        </div>
    );
};

export default FacultyDashboard;
