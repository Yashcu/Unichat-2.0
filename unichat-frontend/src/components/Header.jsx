// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useChat } from '../context/ChatProvider.jsx';
import { getNotifications, markAllNotificationsAsRead } from '../services/notifications';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const GlobalHeader = () => {
    const { user, logout } = useAuth();
    const { socket } = useChat();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if(user) {
            getNotifications().then(res => setNotifications(res.data)).catch(console.error);
        }
    }, [user]);

    useEffect(() => {
        if (!socket) return;
        const handleNewNotification = (newNotification) => {
            setNotifications(prev => [newNotification, ...prev]);
        };
        socket.on('new_notification', handleNewNotification);
        return () => socket.off('new_notification', handleNewNotification);
    }, [socket]);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleOpenChange = (isOpen) => {
        if (isOpen && unreadCount > 0) {
            markAllNotificationsAsRead().then(() => {
                const readNotifications = notifications.map(n => ({ ...n, isRead: true }));
                setNotifications(readNotifications);
            }).catch(console.error);
        }
    };

    const getInitials = (name = '') => name.split(' ').map(n => n[0]).join('').toUpperCase();

    return (
        <header className="w-full bg-white shadow-sm px-6 py-3 flex justify-between items-center fixed top-0 left-0 z-40 h-16">
            <div className="flex items-center h-full">
                <Link to="/" className="flex items-center h-full">
                    <img src="/unichat-logo.png" alt="UniChat Logo" className="h-8 w-8 mr-2" />
                    <span className="text-2xl font-bold text-blue-700">UniChat</span>
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <DropdownMenu onOpenChange={handleOpenChange}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-9 w-9 p-0 rounded-full">
                            <Bell className="h-5 w-5" />
                            {unreadCount > 0 && (
                                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                    {unreadCount}
                                </span>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80" align="end">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {notifications.length > 0 ? (
                            notifications.map(n => (
                                <DropdownMenuItem key={n._id} className="flex flex-col items-start gap-1 p-3">
                                    <p className="text-sm font-medium">{n.message}</p>
                                    <p className="text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleString()}</p>
                                </DropdownMenuItem>
                            ))
                        ) : (
                            <p className="p-4 text-sm text-center text-muted-foreground">No new notifications.</p>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={user?.profilePicture} alt={user?.name} />
                                <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user?.name}</p>
                                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link to="/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default GlobalHeader;
