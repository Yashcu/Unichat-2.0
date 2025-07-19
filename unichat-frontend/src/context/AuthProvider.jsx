// src/context/AuthProvider.jsx
import React, { createContext, useState, useEffect } from "react";
import api from "../services/api"; // We need to use the api service here

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          // Set the authorization header for all future api requests
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const res = await api.get("/auth/me"); // This endpoint needs to exist
          setUser(res.data);
        } catch {
          // If the token is invalid, clear it
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, [token]);

  const login = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    // Remove the authorization header
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};