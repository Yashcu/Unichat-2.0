const express = require('express');
const router = express.Router();
const { isAuthenticated, hasRole } = require('../middleware/auth');
const Event = require('../models/Event');

// Get all relevant events (global + user's events)
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const events = await Event.find({
      $or: [
        { isGlobal: true },
        { createdBy: req.user.id },
        { attendees: req.user.id }
      ]
    }).populate('createdBy', 'name email').populate('attendees', 'name email');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new event
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      createdBy: req.user.id
    });
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Edit event
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    // Only creator or admin can edit
    if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    Object.assign(event, req.body);
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete event
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// RSVP to event
router.post('/:id/rsvp', isAuthenticated, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    const { action } = req.body; // 'join' or 'leave'
    
    if (action === 'join') {
      if (!event.attendees.includes(req.user.id)) {
        event.attendees.push(req.user.id);
      }
    } else if (action === 'leave') {
      event.attendees = event.attendees.filter(id => id.toString() !== req.user.id);
    }
    
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get events by date range
router.get('/range', isAuthenticated, async (req, res) => {
  try {
    const { start, end } = req.query;
    const events = await Event.find({
      date: {
        $gte: new Date(start),
        $lte: new Date(end)
      },
      $or: [
        { isGlobal: true },
        { createdBy: req.user.id },
        { attendees: req.user.id }
      ]
    }).populate('createdBy', 'name email').populate('attendees', 'name email');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 