import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { getDashboardStats } from '../../services/user';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CreateTaskForm from '../../components/CreateTaskForm';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ tasks: 0, upcomingEvents: 0 });
  const [loading, setLoading] = useState(true);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

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

  useEffect(() => {
    fetchStats();
  }, []);

  const handleTaskCreated = () => {
    setIsTaskModalOpen(false);
    fetchStats();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back, {user?.name}!</CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Active Tasks" value={stats.tasks} loading={loading} />
        <StatCard title="Upcoming Events" value={stats.upcomingEvents} loading={loading} />
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
              <DialogTrigger asChild>
                <button className="p-4 border-2 border-dashed rounded-lg hover:border-blue-500 hover:bg-blue-50">New Task</button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a New Task</DialogTitle>
                </DialogHeader>
                <CreateTaskForm onTaskCreated={handleTaskCreated} />
              </DialogContent>
            </Dialog>
            <Link to="/calendar" className="p-4 border-2 border-dashed rounded-lg hover:border-green-500 hover:bg-green-50">Add Event</Link>
            <Link to="/chat" className="p-4 border-2 border-dashed rounded-lg hover:border-purple-500 hover:bg-purple-50">Start Chat</Link>
        </CardContent>
      </Card>
    </div>
  );
};

const StatCard = ({ title, value, loading }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            {loading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{value}</div>}
        </CardContent>
    </Card>
);

export default StudentDashboard;
