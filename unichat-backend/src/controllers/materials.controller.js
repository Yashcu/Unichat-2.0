// src/controllers/materials.controller.js
const Material = require('../models/Material');

// For Faculty: Upload a new course material
exports.uploadMaterial = async (req, res) => {
    try {
        const { course, title, description } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: 'No file was uploaded.' });
        }

        const material = new Material({
            course,
            title,
            description,
            filePath: req.file.path,
            fileName: req.file.originalname,
            uploadedBy: req.user.id
        });

        await material.save();
        res.status(201).json(material);
    } catch (err) {
        res.status(500).json({ message: 'Error uploading material.', error: err.message });
    }
};

// For Students & Faculty: Get all materials, optionally filtered by course
exports.getMaterials = async (req, res) => {
    try {
        const query = req.query.course ? { course: { $regex: req.query.course, $options: 'i' } } : {};
        const materials = await Material.find(query)
            .populate('uploadedBy', 'name')
            .sort({ createdAt: 'desc' });
        res.json(materials);
    } catch {
        res.status(500).json({ message: 'Error fetching materials.' });
    }
};
