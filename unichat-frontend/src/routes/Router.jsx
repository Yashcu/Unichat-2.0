// src/routes/Router.jsx
import React, { useEffect } from "react";
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

function Router(props) {
  useEffect(() => {
    console.log("Router rendered", props);
  }, [props]);
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // Only check user.role if user exists
  const getDashboard = () => {
    if (!user) return <Navigate to="/auth/login" />;
    if (user.role === "student") return <StudentLayout><StudentDashboard /></StudentLayout>;
    if (user.role === "faculty") return <FacultyLayout><FacultyDashboard /></FacultyLayout>;
    if (user.role === "admin") return <AdminLayout><AdminDashboard /></AdminLayout>;
    return <div>Unknown role</div>;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/" element={getDashboard()} />
        <Route path="/chat" element={
          user && user.role === "student" ? <StudentLayout><StudentChatPage /></StudentLayout> :
          user && user.role === "faculty" ? <FacultyLayout><FacultyChatPage /></FacultyLayout> :
          user && user.role === "admin" ? <AdminLayout><AdminChatPage /></AdminLayout> :
          <Navigate to="/" />
        } />
        {/* Add more protected routes for each role as needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;