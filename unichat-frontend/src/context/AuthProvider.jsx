// src/context/AuthProvider.jsx
import React, { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import api, { setAuthHeader } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          setAuthHeader(token);
          const res = await api.get("/auth/me");
          setUser(res.data);
        } catch {
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
          setAuthHeader(null);
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
    setAuthHeader(token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    setAuthHeader(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};
