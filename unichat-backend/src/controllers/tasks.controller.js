// src/controllers/tasks.controller.js
const Task = require('../models/Task');

// Get all tasks for the logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { createdBy: req.user.id },
        { assignedTo: req.user.id }
      ]
    })
    .populate('createdBy', 'name')
    .select('title description deadline isCompleted attachments type') // Only fetch necessary fields
    .sort({ deadline: 'asc' });
    res.json(tasks);
  } catch {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, deadline, priority } = req.body;
    const task = new Task({
      title,
      description,
      deadline,
      priority,
      createdBy: req.user.id,
      assignedTo: [req.user.id] // Assign to self by default
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: 'Error creating task', error: err.message });
  }
};

// Update a task (e.g., mark as complete)
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, deadline, priority, isCompleted } = req.body;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Ensure user has permission to update
    if (task.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.deadline = deadline ?? task.deadline;
    task.priority = priority ?? task.priority;
    task.isCompleted = isCompleted ?? task.isCompleted;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: 'Error updating task', error: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (task.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this task' });
        }

        await Task.findByIdAndDelete(id);
        res.json({ message: 'Task deleted successfully' });
    } catch {
        res.status(500).json({ message: 'Error deleting task' });
    }
};

exports.uploadAttachment = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Add the path of the uploaded file to the task's attachments
        task.attachments.push(req.file.path);
        await task.save();

        res.json({ message: 'File uploaded successfully', task });
    } catch (err) {
        res.status(500).json({ message: 'Error uploading file', error: err.message });
    }
};
