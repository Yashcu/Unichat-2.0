// src/routes/Router.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Import Layouts
import StudentLayout from "../layouts/StudentLayout";
import FacultyLayout from "../layouts/FacultyLayout";
import AdminLayout from "../layouts/AdminLayout";

// Import Main Pages
import ChatPage from '../pages/ChatPage';
import TasksPage from '../pages/TasksPage';
import CalendarPage from '../pages/CalendarPage';

// Import Dashboard Pages
import StudentDashboard from '../pages/student/dashboard';
import AdminDashboard from '../pages/admin/dashboard';
import FacultyDashboard from '../pages/faculty/dashboard';

// Import Admin Pages
import UserManagementPage from "../pages/admin/UserManagementPage";
import SystemLogsPage from '../pages/admin/SystemLogsPage';
import BroadcastPage from '../pages/admin/BroadcastPage';

// Import Auth Pages
import Login from "../pages/auth/Login";

// A component to protect routes that require a user to be logged in
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? children : <Navigate to="/auth/login" />;
};

// This component wraps a page with the correct layout based on user role
const RoleBasedLayout = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth/login" />;

  switch (user.role) {
    case "student": return <StudentLayout>{children}</StudentLayout>;
    case "faculty": return <FacultyLayout>{children}</FacultyLayout>;
    case "admin": return <AdminLayout>{children}</AdminLayout>;
    default: return <div>Unknown role. Please contact support.</div>;
  }
};

// This component selects the correct dashboard for the user
const DashboardSelector = () => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/auth/login" />;

    switch (user.role) {
      case "student": return <StudentDashboard />;
      case "faculty": return <FacultyDashboard />;
      case "admin": return <AdminDashboard />;
      default: return <div>Unknown role.</div>;
    }
};

function Router() {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Route */}
        <Route path="/auth/login" element={user ? <Navigate to="/" /> : <Login />} />

        {/* Main Routes */}
        <Route path="/" element={<ProtectedRoute><RoleBasedLayout><DashboardSelector /></RoleBasedLayout></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><RoleBasedLayout><ChatPage /></RoleBasedLayout></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><RoleBasedLayout><TasksPage /></RoleBasedLayout></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><RoleBasedLayout><CalendarPage /></RoleBasedLayout></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin/users" element={<ProtectedRoute><RoleBasedLayout><UserManagementPage /></RoleBasedLayout></ProtectedRoute>} />
        <Route path="/admin/logs" element={<ProtectedRoute><RoleBasedLayout><SystemLogsPage /></RoleBasedLayout></ProtectedRoute>} />
        <Route path="/admin/broadcast" element={<ProtectedRoute><RoleBasedLayout><BroadcastPage /></RoleBasedLayout></ProtectedRoute>} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
