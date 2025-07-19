// src/context/SocketProvider.jsx
import React, { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import useAuth from '../hooks/useAuth';
import PropTypes from 'prop-types';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const { user, token } = useAuth();
    const socketRef = useRef(null);

    useEffect(() => {
        if (token && user) {
            const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
                auth: { token, userId: user.id }
            });
            socketRef.current = newSocket;

            newSocket.on('connect', () => console.log(`--- FRONTEND: Socket connected with ID [${newSocket.id}] ---`));
            newSocket.on('disconnect', () => console.log('--- FRONTEND: Socket disconnected ---'));

            return () => {
                newSocket.disconnect();
            };
        } else if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
        }
    }, [token, user]);

    return (
        <SocketContext.Provider value={socketRef.current}>
            {children}
        </SocketContext.Provider>
    );
};

SocketProvider.propTypes = {
    children: PropTypes.node.isRequired
};
