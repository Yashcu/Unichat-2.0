// src/routes/Router.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import AuthCallback from "../pages/auth/AuthCallback";
import useAuth from "../hooks/useAuth";
import StudentDashboard from "../pages/student/dashboard";
import FacultyDashboard from "../pages/faculty/dashboard";
import AdminDashboard from "../pages/admin/dashboard";
import StudentLayout from "../layouts/StudentLayout";
import FacultyLayout from "../layouts/FacultyLayout";
import AdminLayout from "../layouts/AdminLayout";
import StudentChatPage from "../pages/student/Chat";
import FacultyChatPage from "../pages/faculty/Chat";
import AdminChatPage from "../pages/admin/Chat";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

const RoleBasedLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" />;
  }
  
  switch (user.role) {
    case "student":
      return <StudentLayout><StudentDashboard /></StudentLayout>;
    case "faculty":
      return <FacultyLayout><FacultyDashboard /></FacultyLayout>;
    case "admin":
      return <AdminLayout><AdminDashboard /></AdminLayout>;
    default:
      return <div>Unknown role</div>;
  }
};

const RoleBasedChatLayout = () => {
    const { user } = useAuth();
  
    if (!user) {
      return <Navigate to="/auth/login" />;
    }
  
    switch (user.role) {
      case "student":
        return <StudentLayout><StudentChatPage /></StudentLayout>;
      case "faculty":
        return <FacultyLayout><FacultyChatPage /></FacultyLayout>;
      case "admin":
        return <AdminLayout><AdminChatPage /></AdminLayout>;
      default:
        return <div>Unknown role</div>;
    }
  };

function Router() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <RoleBasedLayout />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute>
              <RoleBasedChatLayout />
            </ProtectedRoute>
          } 
        />
        {/* Add more protected routes for each role as needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;