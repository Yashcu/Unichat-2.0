// src/components/CreateAssignmentForm.jsx
import React, { useState, useEffect } from 'react';
import { getAllStudents, createAssignment } from '../services/faculty';

const CreateAssignmentForm = ({ onAssignmentCreated }) => {
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await getAllStudents();
                setStudents(response.data);
            } catch (err) {
                setError('Could not load students list.');
            }
        };
        fetchStudents();
    }, []);

    const handleStudentSelect = (studentId) => {
        setSelectedStudents(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!title.trim() || selectedStudents.length === 0) {
            setError('Title and at least one student are required.');
            return;
        }
        try {
            await createAssignment({ title, deadline, assignedTo: selectedStudents });
            setSuccess('Assignment created successfully!');
            setTitle('');
            setDeadline('');
            setSelectedStudents([]);
            if (onAssignmentCreated) onAssignmentCreated();
        } catch (err) {
            setError('Failed to create assignment.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-md bg-gray-50 space-y-4">
            <h2 className="text-lg font-semibold">Create New Assignment</h2>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Assignment Title" className="border rounded-md p-2 w-full" />
            <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="border rounded-md p-2 w-full" />

            <div>
                <p className="font-medium mb-2">Assign to Students:</p>
                <div className="max-h-40 overflow-y-auto border rounded-md p-2 space-y-1">
                    {students.map(student => (
                        <label key={student._id} className="flex items-center">
                            <input type="checkbox" checked={selectedStudents.includes(student._id)} onChange={() => handleStudentSelect(student._id)} className="mr-2"/>
                            {student.name} ({student.email})
                        </label>
                    ))}
                </div>
            </div>

            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md">Create Assignment</button>
        </form>
    );
};

export default CreateAssignmentForm;
