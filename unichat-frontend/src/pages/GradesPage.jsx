// src/pages/GradesPage.jsx
import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { getMyGrades } from '../services/grades';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const GradesPage = () => {
    const { user } = useAuth();
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user.role === 'student') {
            const fetchGrades = async () => {
                try {
                    const response = await getMyGrades();
                    setGrades(response.data);
                } catch {
                    setError('Failed to fetch grades.');
                } finally {
                    setLoading(false);
                }
            };
            fetchGrades();
        } else {
            setLoading(false);
        }
    }, [user.role]);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>My Grades</CardTitle>
                    <CardDescription>
                        Here is an overview of your grades for submitted assignments.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading && <p>Loading grades...</p>}
                    {error && <p className="text-red-500">{error}</p>}

                    {user.role === 'student' && !loading && (
                        <div className="space-y-4">
                            {grades.length === 0 ? (
                                <p>No grades have been posted yet.</p>
                            ) : (
                                grades.map((grade) => (
                                    <div key={grade._id} className="p-4 border rounded-lg flex justify-between items-center">
                                        <div>
                                            <p className="font-bold">{grade.task?.title || 'Untitled Task'}</p>
                                            <p className="text-sm text-gray-600">Graded by: {grade.gradedBy?.name || 'N/A'}</p>
                                            {grade.feedback && <p className="text-sm mt-1"><em>Feedback: {grade.feedback}</em></p>}
                                        </div>
                                        <div className="text-xl font-bold">
                                            {grade.grade}%
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {user.role === 'faculty' && (
                        <p>Faculty grade submission interface would be here.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default GradesPage;
