// src/controllers/calendar.controller.js
const Event = require('../models/Event');

// Get all events relevant to the user (theirs + global)
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({
      $or: [
        { isGlobal: true },
        { createdBy: req.user.id },
        { attendees: req.user.id }
      ]
    }).populate('createdBy', 'name');
    res.json(events);
  } catch {
    res.status(500).json({ message: 'Error fetching events' });
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, type } = req.body;
    const event = new Event({
      title,
      description,
      date,
      type,
      createdBy: req.user.id,
      attendees: [req.user.id] // Creator automatically attends
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: 'Error creating event', error: err.message });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // Only the creator or an admin can delete an event
        if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this event' });
        }

        await Event.findByIdAndDelete(id);
        res.json({ message: 'Event deleted successfully' });
    } catch {
        res.status(500).json({ message: 'Error deleting event' });
    }
};
