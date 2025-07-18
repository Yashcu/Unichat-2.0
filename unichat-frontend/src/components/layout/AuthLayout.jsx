// src/components/layout/AuthLayout.jsx
import React from "react";
import { Link } from "react-router-dom";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        {/* Branding / Side Section */}
        <div className="hidden md:flex flex-col justify-center items-center bg-blue-600 text-white w-full md:w-1/2 p-10">
          <h1 className="text-4xl font-bold mb-4">UniChat</h1>
          <p className="text-center">Smarter communication, planning & productivity for your university life.</p>
        </div>

        {/* Auth Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 mb-6">{subtitle}</p>
          {children}
          <p className="text-sm text-gray-500 mt-6 text-center">
            {title === "Login" ? (
              <>
                Don't have an account? <Link to="/auth/signup" className="text-blue-600 hover:underline">Sign Up</Link>
              </>
            ) : (
              <>
                Already have an account? <Link to="/auth/login" className="text-blue-600 hover:underline">Login</Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
