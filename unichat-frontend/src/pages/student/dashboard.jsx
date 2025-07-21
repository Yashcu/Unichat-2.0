// src/pages/student/dashboard.jsx
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { getDashboardStats } from '../../services/user';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CreateTaskForm from '../../components/CreateTaskForm';
import { getTasks, updateTask } from '../../services/tasks';
import { getEvents } from '../../services/calendar';
import { getNotifications } from '../../services/notifications';
import QuickActionLink from '../../components/dashboard/QuickActionLink';
import { MessageSquare, Calendar, Upload, MessageCircle, Plus, CalendarX, ClipboardList, Inbox } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Header from '../../components/Header';
import { Checkbox } from '@/components/ui/checkbox';

// Inline QuickAccessBar component for header
const QuickAccessBar = () => (
  <div className="flex gap-2 md:gap-4 items-center">
    <QuickActionLink to="/ai" label="AI Assistant" color="blue" icon={MessageSquare} inline />
    <QuickActionLink to="/calendar" label="Add Event" color="green" icon={Calendar} inline />
    <QuickActionLink to="/chat" label="New Chat" color="purple" icon={MessageCircle} inline />
  </div>
);

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ tasks: 0, upcomingEvents: 0 });
  const [loading, setLoading] = useState(true);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // Real-time greeting state
  const [greeting, setGreeting] = useState('Good morning');

  // New state for dashboard sections
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [aiInsights, setAiInsights] = useState({});
  const [tasksLoading, setTasksLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [announcementsLoading, setAnnouncementsLoading] = useState(true);
  const [taskUpdating, setTaskUpdating] = useState({}); // { [taskId]: boolean }

  // Fetch dashboard stats
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

  // Fetch tasks
  const fetchTasks = async (showLoading = true) => {
    if (showLoading) setTasksLoading(true);
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      setTasks([]);
    } finally {
      if (showLoading) setTasksLoading(false);
    }
  };

  // Fetch events
  const fetchEvents = async () => {
    setEventsLoading(true);
    try {
      const response = await getEvents();
      setEvents(response.data);
    } catch (error) {
      setEvents([]);
    } finally {
      setEventsLoading(false);
    }
  };

  // Fetch notifications (for messages and announcements)
  const fetchNotifications = async () => {
    setNotificationsLoading(true);
    setAnnouncementsLoading(true);
    try {
      const response = await getNotifications();
      // Split notifications into messages and announcements
      setNotifications(response.data.filter(n => n.type === 'message'));
      setAnnouncements(response.data.filter(n => n.type === 'announcement'));
    } catch (error) {
      setNotifications([]);
      setAnnouncements([]);
    } finally {
      setNotificationsLoading(false);
      setAnnouncementsLoading(false);
    }
  };

  // Handler to toggle task completion
  const handleTaskCheck = async (task) => {
    setTaskUpdating(prev => ({ ...prev, [task._id]: true }));
    try {
      await updateTask(task._id, { isCompleted: !task.isCompleted });
      fetchStats();
      // Only refresh tasks, but do not show full loading spinner
      await fetchTasks(false);
    } catch (e) {
      console.error('Failed to update task:', e);
      // Optionally, you could set an error state here to show a message to the user
    } finally {
      setTaskUpdating(prev => ({ ...prev, [task._id]: false }));
    }
  };

  useEffect(() => {
    fetchStats();
    fetchTasks();
    fetchEvents();
    fetchNotifications();
    // Optionally fetch AI insights here
  }, []);

  useEffect(() => {
    function getGreeting() {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good Morning';
      if (hour < 18) return 'Good Afternoon';
      return 'Good Evening';
    }
    setGreeting(getGreeting());
    // Update greeting every minute in case the time of day changes
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleTaskCreated = () => {
    setIsTaskModalOpen(false);
    fetchStats();
    fetchTasks();
  };

  // Helper: filter today's events
  const today = new Date();
  const todayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === today.toDateString();
  });

  // Helper: tasks progress
  const completedTasks = tasks.filter(t => t.isCompleted).length;
  const totalTasks = tasks.length;
  const progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Helper: get task urgency (background and label)
  function getTaskUrgency(task) {
    let bg = 'bg-gray-100';
    let label = '';
    if (!task.isCompleted && task.dueDate) {
      const due = new Date(task.dueDate);
      const now = new Date();
      const diff = (due - now) / (1000 * 60 * 60 * 24);
      if (diff < 0) {
        bg = 'bg-red-100';
        label = 'Overdue';
      } else if (diff < 1) {
        bg = 'bg-red-100';
        label = 'Due today';
      } else if (diff < 3) {
        bg = 'bg-yellow-100';
        label = 'Due soon';
      }
    }
    return { bg, label };
  }

  return (
    <>
      {/* Header with Quick Access Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight ">{greeting}, {user?.name}</h1>
          <div className="text-base text-gray-500 font-normal">
            {totalTasks > 0 ? `${totalTasks - completedTasks} tasks due today` : 'No tasks due today'}
            {todayEvents[0] && <span className="ml-4">Next: {todayEvents[0].title} at {new Date(todayEvents[0].date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>}
          </div>
        </div>
        {/* Quick Access Bar */}
        <QuickAccessBar />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl mx-auto px-2 md:px-4 py-4">
        {/* Main Column (2/3) */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {/* Today's Schedule */}
          <Card className="shadow-md">
            <CardHeader className="pb-0 px-3">
              <CardTitle className="text-base">Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-2 px-3">
              {eventsLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[32px] text-gray-400 text-center">
                  <CalendarX className="w-6 h-6 mb-1" />
                  <span className="text-sm">Loading...</span>
                </div>
              ) : todayEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[32px] bg-gray-50 rounded-lg border border-dashed border-gray-200 py-1 text-center">
                  <CalendarX className="w-6 h-6 mb-1 text-blue-400" />
                  <span className="text-gray-500 font-medium text-sm">No events today</span>
                  <span className="text-xs text-gray-400 mt-1">Use the <span className='font-semibold'>Add Event</span> button to plan your day.</span>
                </div>
              ) : (
                <ul className="space-y-1">
                  {todayEvents.map(event => (
                    <li key={event._id} className="flex items-center justify-between p-1 rounded-lg hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-300">
                      <div>
                        <div className="font-semibold text-sm">{event.title}</div>
                        <div className="text-xs text-gray-500">{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {event.location || 'Room TBD'}</div>
                      </div>
                      <Link to="/calendar" className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded shadow-sm font-semibold transition hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400">Join</Link>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
          {/* My Tasks */}
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-0 px-3">
              <CardTitle className="text-base">My Tasks</CardTitle>
              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                title="Add Task"
              >
                <Plus className="w-4 h-4" />
              </button>
            </CardHeader>
            <CardContent className="pt-0 pb-2 px-3">
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="text-xs text-gray-500 mb-1">Progress ({completedTasks}/{totalTasks})</div>
              <div className="mb-2">
                <Link to="/tasks" className="text-xs text-blue-600 hover:underline">View All Tasks</Link>
              </div>
              {tasksLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[32px] text-gray-400 text-center">
                  <ClipboardList className="w-6 h-6 mb-1" />
                  <span className="text-sm">Loading...</span>
                </div>
              ) : tasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[32px] bg-gray-50 rounded-lg border border-dashed border-gray-200 py-1 text-center">
                  <ClipboardList className="w-6 h-6 mb-1 text-blue-400" />
                  <span className="text-gray-500 font-medium text-sm">No tasks</span>
                  <span className="text-xs text-gray-400 mt-1">Create a new task to stay organized.</span>
                </div>
              ) : (
                <ul className="space-y-1">
                  {tasks.slice(0, 3).map(task => {
                    const { bg, label } = getTaskUrgency(task);
                    return (
                      <li key={task._id} className={`p-1 rounded ${bg} flex flex-col gap-1 focus:outline-none focus:ring-2 focus:ring-blue-300`}>
                        <div className="flex justify-between items-center gap-1">
                          <div className="flex items-center gap-1">
                            <Checkbox
                              checked={task.isCompleted}
                              disabled={taskUpdating[task._id]}
                              onCheckedChange={() => handleTaskCheck(task)}
                              aria-label={task.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                              className="transition focus:ring-2 focus:ring-blue-400"
                            />
                            <span className={task.isCompleted ? 'line-through text-gray-400 text-sm' : 'font-medium text-sm'}>{task.title}</span>
                          </div>
                          <span className="text-xs text-gray-500">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}</span>
                        </div>
                        {!task.isCompleted && task.dueDate && label && (
                          <span className="text-xs font-semibold text-red-500 mt-0.5">{label}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Side Column (1/3) */}
        <div className="md:col-span-1 flex flex-col gap-4">
          {/* Announcements */}
          <Card className="shadow-md">
            <CardHeader className="pb-0 px-3">
              <CardTitle className="text-base">Announcements <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">{announcements.length} new</span></CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-2 px-3">
              {announcementsLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[32px] text-gray-400 text-center">
                  <Inbox className="w-6 h-6 mb-1" />
                  <span className="text-sm">Loading...</span>
                </div>
              ) : announcements.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[32px] bg-gray-50 rounded-lg border border-dashed border-gray-200 py-1 text-center">
                  <Inbox className="w-6 h-6 mb-1 text-green-400" />
                  <span className="text-gray-500 font-medium text-sm">No announcements</span>
                  <span className="text-xs text-gray-400 mt-1">Important updates from your courses will show here.</span>
                </div>
              ) : (
                <ul className="space-y-1">
                  {announcements.slice(0, 3).map((ann, idx) => {
                    let bg = idx % 2 === 0 ? 'bg-blue-100' : 'bg-green-100';
                    return (
                      <li key={ann._id} className={`flex items-center gap-2 p-1 rounded ${bg} focus:outline-none focus:ring-2 focus:ring-blue-300`} tabIndex={0}>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-xs truncate">{ann.title || 'Announcement'}</div>
                          <div className="text-xs text-gray-600 truncate">{ann.content}</div>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">NEW</span>
                      </li>
                    );
                  })}
                </ul>
              )}
              {announcements.length > 3 && <div className="mt-1"><Link to="/announcements" className="text-xs text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400">View All</Link></div>}
            </CardContent>
          </Card>
          {/* Messages (moved below Announcements) */}
          <Card className="shadow-md">
            <CardHeader className="pb-0 px-3">
              <CardTitle className="text-base">Messages <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">{notifications.length}</span></CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-2 px-3">
              {notificationsLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[32px] text-gray-400 text-center">
                  <Inbox className="w-6 h-6 mb-1" />
                  <span className="text-sm">Loading...</span>
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[32px] bg-gray-50 rounded-lg border border-dashed border-gray-200 py-1 text-center">
                  <Inbox className="w-6 h-6 mb-1 text-red-400" />
                  <span className="text-gray-500 font-medium text-sm">No messages</span>
                  <span className="text-xs text-gray-400 mt-1">New messages from your courses will appear here.</span>
                </div>
              ) : (
                <ul className="space-y-1">
                  {notifications.slice(0, 3).map(msg => (
                    <li key={msg._id} className="flex items-center gap-2 p-1 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-300" tabIndex={0}>
                      <Avatar>
                        <AvatarFallback>
                          {msg.sender?.name ? msg.sender.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() : 'UC'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-xs truncate">{msg.sender?.name || 'System'}</div>
                        <div className="text-xs text-gray-500 truncate">{msg.content}</div>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                    </li>
                  ))}
                </ul>
              )}
              {notifications.length > 3 && <div className="mt-1"><Link to="/chat" className="text-xs text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400">View All</Link></div>}
            </CardContent>
          </Card>
        </div>
        {/* Task Modal */}
        <Dialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent showCloseButton={false} className="bg-transparent border-none shadow-none p-0">
            <CreateTaskForm onTaskCreated={handleTaskCreated} onClose={() => setIsTaskModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default StudentDashboard;
