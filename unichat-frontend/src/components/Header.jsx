// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import { useChat } from '../context/ChatProvider'; // Corrected import path
import { getNotifications, markAllNotificationsAsRead } from '../services/notifications';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = ({ title }) => {
    const { user, logout } = useAuth();
    const { socket } = useChat() || {}; // Add a fallback for socket
    const [notifications, setNotifications] = useState([]);
    // ... (rest of the component code is unchanged)
    // ...

    return (
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            {/* ... (rest of the JSX is unchanged) */}
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired
};

export default Header;
