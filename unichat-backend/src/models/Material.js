const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    course: { type: String, required: true, trim: true },
    title: { type: String, required: true },
    description: { type: String },
    filePath: { type: String, required: true },
    fileName: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Material', materialSchema);
