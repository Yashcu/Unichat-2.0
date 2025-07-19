// src/models/Grade.js
const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  course: { type: String, required: true }, // To group grades by course
  grade: { type: Number, required: true },
  feedback: { type: String },
  gradedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

// Ensure a student can only have one grade per task
gradeSchema.index({ student: 1, task: 1 }, { unique: true });

module.exports = mongoose.model('Grade', gradeSchema);
