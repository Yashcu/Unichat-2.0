// src/layouts/AdminLayout.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/' },
    { name: 'Users', href: '/admin/users' },
    { name: 'System Logs', href: '/admin/logs' },
    { name: 'Broadcasts', href: '/admin/broadcast' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="flex items-center justify-center h-16 bg-red-600">
          <h1 className="text-xl font-bold text-white">UniChat Admin</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === item.href
                  ? 'bg-red-100 text-red-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <p className="text-sm font-medium text-gray-700">{user?.name} (Admin)</p>
          <button onClick={logout} className="text-sm text-red-500 hover:underline">Logout</button>
        </div>
      </div>
      <div className="flex-1">
        <main className="p-6 h-full">{children}</main>
      </div>
    </div>
  );
};

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default AdminLayout;
