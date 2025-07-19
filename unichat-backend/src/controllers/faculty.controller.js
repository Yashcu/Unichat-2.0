// src/controllers/faculty.controller.js
const Task = require('../models/Task');
const Event = require('../models/Event');
const User = require('../models/User');
const { createNotification } = require('../services/notification.service');

// Get statistics for the logged-in faculty member's dashboard
exports.getDashboardStats = async (req, res) => {
    try {
        const userId = req.user.id;

        const [assignmentsCreatedCount, eventsCreatedCount] = await Promise.all([
            // Count tasks created by this faculty member that are of type 'assignment'
            Task.countDocuments({ createdBy: userId, type: 'assignment' }),

            // Count events created by this faculty member
            Event.countDocuments({ createdBy: userId })
        ]);

        res.json({
            assignmentsCreated: assignmentsCreatedCount,
            eventsCreated: eventsCreatedCount,
            // You can add more stats here in the future, like pending submissions
        });

    } catch (err) {
        console.error("Faculty Dashboard Stats Error:", err);
        res.status(500).json({ message: 'Error fetching faculty dashboard statistics' });
    }
};

// Get all students for the faculty member
exports.getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'student' }).select('name email');
        res.json(students);
    } catch {
        res.status(500).json({ message: 'Error fetching students' });
    }
};

// Create a new assignment for students
exports.createAssignment = async (req, res) => {
    try {
        const { title, description, deadline, assignedTo } = req.body;

        if (!title || !assignedTo || assignedTo.length === 0) {
            return res.status(400).json({ message: 'Title and at least one student are required.' });
        }

        const assignment = new Task({
            title,
            description,
            deadline,
            type: 'assignment', // Set the type specifically
            createdBy: req.user.id,
            assignedTo: assignedTo, // Array of student IDs
        });

        await assignment.save();

        const message = `You have been assigned a new task: "${title}"`;
        const link = `/tasks`;
        assignedTo.forEach(studentId => {
            createNotification(studentId, message, link);
        });


        res.status(201).json(assignment);
    } catch (err) {
        res.status(400).json({ message: 'Error creating assignment', error: err.message });
    }
};
