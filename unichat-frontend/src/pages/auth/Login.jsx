// src/pages/auth/Login.jsx
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (error) setError("");
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const validateForm = () => {
        if (!form.email) return setError("Email is required.") || false;
        if (!/\S+@\S+\.\S+/.test(form.email)) return setError("Please enter a valid email address.") || false;
        if (!form.password) return setError("Password is required.") || false;
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!validateForm()) return;

        setLoading(true);
        try {
            const res = await api.post("/auth/login", form);
            login(res.data.token, res.data.user);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full lg:grid lg:grid-cols-2 font-inter">
            {/* Left Side */}
            <div className="relative hidden flex-col justify-between p-10 text-white lg:flex login-image-bg rounded-r-lg">
                <div className="absolute inset-0 bg-zinc-900 opacity-60 rounded-r-lg" />
                <div className="relative z-10">
                    <Link to="/" className="text-2xl font-bold rounded-md">UniChat</Link>
                </div>
                <div className="relative z-10 mt-auto">
                    <h1 className="text-4xl font-bold">Connecting Our Campus Community</h1>
                    <p className="mt-2 text-lg text-zinc-300">
                        The smart, secure, and simple chat application for students and faculty.
                    </p>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center justify-center p-6 lg:p-8 bg-white rounded-l-lg shadow-lg">
                <div className="mx-auto w-full max-w-md space-y-6 animate-fade-in">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Login to your Account</h2>
                        <p className="mt-2 text-gray-700">Use your university credentials to access the dashboard.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <p
                                className="text-red-600 bg-red-50 p-3 rounded-md text-sm font-medium text-center border border-red-200 animate-fade-in"
                                role="alert"
                                aria-live="assertive"
                            >
                                {error}
                            </p>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="student@university.edu"
                                value={form.email}
                                onChange={handleChange}
                                autoFocus
                                required
                                disabled={loading}
                                className="rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                aria-describedby="email-desc"
                            />
                            <small id="email-desc" className="sr-only">Enter your university email</small>
                        </div>
                        <div className="space-y-2 relative">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                className="rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                                aria-describedby="password-desc"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center top-7"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                                )}
                            </button>
                        </div>
                        <Button
                            type="submit"
                            className="w-full text-lg py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md transition duration-200"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Logging in...
                                </span>
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
