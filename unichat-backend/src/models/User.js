// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  studentId: { type: String, unique: true, sparse: true }, // Optional for faculty/admin
  password: { type: String }, // Not required if using only Firebase/Auth0
  role: { type: String, enum: ['student', 'faculty', 'admin'], default: 'student' },
  preferences: { type: Object, default: {} }, // User preferences
  isBlocked: { type: Boolean, default: false },
  lastActive: { type: Date, default: Date.now },
  profilePicture: { type: String },
  department: { type: String }, // For faculty/admin
  year: { type: Number }, // For students
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);