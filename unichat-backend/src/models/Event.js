const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['exam', 'holiday', 'deadline', 'custom'], default: 'custom' },
  date: { type: Date, required: true },
  endDate: { type: Date },
  location: { type: String },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isGlobal: { type: Boolean, default: false }, // For admin-created global events
  color: { type: String, default: '#3B82F6' }, // Event color for UI
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema); 