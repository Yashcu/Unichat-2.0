// src/controllers/grade.controller.js
const Grade = require('../models/Grade');
const Task = require('../models/Task');
const { createNotification } = require('../services/notification.service');

// For Faculty: Add or update a grade for a student's task
exports.addOrUpdateGrade = async (req, res) => {
    const { studentId, taskId, course, grade, feedback } = req.body;
    const facultyId = req.user.id;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Assignment/Task not found.' });
        }

        // Optional: Check if the faculty member is the creator of the task
        if (task.createdBy.toString() !== facultyId) {
            return res.status(403).json({ message: 'You are not authorized to grade this task.' });
        }

        const updatedGrade = await Grade.findOneAndUpdate(
            { student: studentId, task: taskId },
            { student: studentId, task: taskId, course, grade, feedback, gradedBy: facultyId },
            { new: true, upsert: true, runValidators: true } // Upsert creates the doc if it doesn't exist
        );

        // Notify the student
        const notificationMessage = `Your grade for "${task.title}" has been updated to: ${grade}`;
        createNotification(studentId, notificationMessage, '/grades');

        res.status(201).json(updatedGrade);
    } catch (err) {
        res.status(500).json({ message: 'Error adding or updating grade.', error: err.message });
    }
};

// For Students: Get all of their own grades
exports.getMyGrades = async (req, res) => {
    try {
        const myGrades = await Grade.find({ student: req.user.id })
            .populate('task', 'title') // Populate the task title
            .populate('gradedBy', 'name') // Populate the faculty's name
            .sort({ createdAt: 'desc' });
        res.json(myGrades);
    } catch {
        res.status(500).json({ message: 'Error fetching grades.' });
    }
};
