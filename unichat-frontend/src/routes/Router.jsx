import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Layouts
import StudentLayout from "../layouts/StudentLayout";
import FacultyLayout from "../layouts/FacultyLayout";
import AdminLayout from "../layouts/AdminLayout";

// Auth Pages (loaded immediately)
import Login from "../pages/auth/Login";

// Lazy-loaded Pages
const StudentDashboard = lazy(() => import('../pages/student/dashboard'));
const FacultyDashboard = lazy(() => import('../pages/faculty/dashboard'));
const AdminDashboard = lazy(() => import('../pages/admin/dashboard'));
const ChatPage = lazy(() => import('../pages/ChatPage'));
const TasksPage = lazy(() => import('../pages/TasksPage'));
const CalendarPage = lazy(() => import('../pages/CalendarPage'));
const UserManagementPage = lazy(() => import("../pages/admin/UserManagementPage"));
const SystemLogsPage = lazy(() => import('../pages/admin/SystemLogsPage'));
const BroadcastPage = lazy(() => import('../pages/admin/BroadcastPage'));
const MaterialsPage = lazy(() => import('../pages/MaterialsPage'));

// Loading Fallback Component
const PageLoader = () => (
    <div className="flex h-screen w-full items-center justify-center">
        <p>Loading...</p>
    </div>
);

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  return user ? children : <Navigate to="/auth/login" />;
};

const RoleBasedLayout = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth/login" />;

  switch (user.role) {
    case "student": return <StudentLayout>{children}</StudentLayout>;
    case "faculty": return <FacultyLayout>{children}</FacultyLayout>;
    case "admin": return <AdminLayout>{children}</AdminLayout>;
    default: return <div>Unknown role.</div>;
  }
};

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
  if (loading) return <PageLoader />;

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/auth/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/" element={<ProtectedRoute><RoleBasedLayout><DashboardSelector /></RoleBasedLayout></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><RoleBasedLayout><ChatPage /></RoleBasedLayout></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><RoleBasedLayout><TasksPage /></RoleBasedLayout></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><RoleBasedLayout><CalendarPage /></RoleBasedLayout></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><RoleBasedLayout><UserManagementPage /></RoleBasedLayout></ProtectedRoute>} />
          <Route path="/admin/logs" element={<ProtectedRoute><RoleBasedLayout><SystemLogsPage /></RoleBasedLayout></ProtectedRoute>} />
          <Route path="/admin/broadcast" element={<ProtectedRoute><RoleBasedLayout><BroadcastPage /></RoleBasedLayout></ProtectedRoute>} />
          <Route path="/materials" element={<ProtectedRoute><RoleBasedLayout><MaterialsPage /></RoleBasedLayout></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;
