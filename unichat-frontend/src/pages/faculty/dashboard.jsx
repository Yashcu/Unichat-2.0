// src/pages/student/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
const FacultyDashboard = () => (
  <div>
    <h1>Faculty Dashboard</h1>
    <Link to="/chat" className="btn btn-primary">Go to Chat</Link>
    {/* ...other widgets */}
  </div>
);
export default FacultyDashboard;