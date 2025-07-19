// src/pages/ProfilePage.jsx
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { updateProfile, changePassword } from '../services/user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ProfilePage = () => {
    const { user, login } = useAuth();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProfile({ name, email });
            if (response.data && response.data.user) {
                login(response.data.user);
            }
            alert("Profile updated successfully.");
        } catch {
            alert("Failed to update profile.");
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            const response = await changePassword(passwords);
            alert(response.data.message || "Password changed successfully.");
            setPasswords({ currentPassword: '', newPassword: '' });
        } catch (error) {
            alert(error.response?.data?.message || "Failed to change password.");
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>My Profile</CardTitle>
                    <CardDescription>Update your personal information.</CardDescription>
                </CardHeader>
                <form onSubmit={handleProfileUpdate}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <Button type="submit">Save Changes</Button>
                    </CardContent>
                </form>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Choose a new, strong password.</CardDescription>
                </CardHeader>
                <form onSubmit={handlePasswordChange}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" type="password" value={passwords.currentPassword} onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" value={passwords.newPassword} onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})} />
                        </div>
                        <Button type="submit">Change Password</Button>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
};

export default ProfilePage;
