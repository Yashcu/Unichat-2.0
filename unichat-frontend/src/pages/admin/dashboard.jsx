// src/pages/student/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
const AdminDashboard = () => (
  <div>
    <h1>Admin Dashboard</h1>
    <Link to="/chat" className="btn btn-primary">Go to Chat</Link>
    {/* ...other widgets */}
  </div>
);
export default AdminDashboard;