import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';

const StudentLayout = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/' },
    { name: 'Chat', href: '/chat' },
    { name: 'Tasks', href: '/tasks' },
    { name: 'Calendar', href: '/calendar' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white shadow-md flex-col hidden md:flex">
        <div className="flex items-center justify-center h-16 bg-blue-600">
          <h1 className="text-xl font-bold text-white">UniChat</h1>
        </div>
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
        <Header title="Student Portal" />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default StudentLayout;
