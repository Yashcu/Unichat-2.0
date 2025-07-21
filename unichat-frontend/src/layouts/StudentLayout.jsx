// src/layouts/StudentLayout.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';

const StudentLayout = ({ children }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/' },
    { name: 'Messages', href: '/chat' },
    { name: 'Calendar', href: '/calendar' },
    { name: 'Courses', href: '/courses' },
    { name: 'Tasks', href: '/tasks' },
    { name: 'AI Assistant', href: '/ai' },
    { name: 'Materials', href: '/materials' },
    { name: 'Announcement', href: '/announcements' },
    { name: 'Settings', href: '/settings' },
  ];

  const currentPage = navigation.find(item => item.href === location.pathname) || { name: 'UniChat' };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Spacer for fixed global header */}
      <div className="w-0 h-16" />
      <aside className="w-64 bg-white shadow-md flex-col hidden md:flex mt-16">
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === item.href
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <main className="flex-1">
            {children}
        </main>
      </div>
    </div>
  );
};

StudentLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default StudentLayout;
