// src/pages/student/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { getDashboardStats } from '../../services/user'; // Import the new service
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    tasks: 0,
    upcomingEvents: 0,
    recentMessages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
        try {
            const response = await getDashboardStats();
            setStats(response.data);
        } catch (error) {
            console.error("Failed to fetch dashboard stats", error);
        } finally {
            setLoading(false);
        }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-2">Here's your academic summary.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Active Tasks" value={stats.tasks} loading={loading} />
        <StatCard title="Upcoming Events" value={stats.upcomingEvents} loading={loading} />
        <StatCard title="Unread Messages" value={stats.recentMessages} loading={loading} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickActionLink to="/tasks" label="New Task" />
          <QuickActionLink to="/calendar" label="Add Event" />
          <QuickActionLink to="/chat" label="Start Chat" />
          <QuickActionLink to="/ai" label="AI Assistant" />
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
    <Link to={to} className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center">
        <p className="text-sm font-medium text-gray-700">{label}</p>
    </Link>
);


export default StudentDashboard;
