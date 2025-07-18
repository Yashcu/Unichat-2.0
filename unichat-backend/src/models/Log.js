const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  resource: { type: String }, // What resource was affected (user, task, event, etc.)
  resourceId: { type: mongoose.Schema.Types.ObjectId }, // ID of the affected resource
  details: { type: Object }, // Additional information about the action
  ipAddress: { type: String },
  userAgent: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema); 