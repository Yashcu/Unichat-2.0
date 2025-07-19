// src/pages/CalendarPage.jsx
import React, { useState, useEffect } from 'react';
import { getEvents, createEvent, deleteEvent } from '../services/calendar';
import useAuth from '../hooks/useAuth';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();

  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.data);
    } catch {
      setError('Failed to fetch events.');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!title.trim() || !date) return;
    try {
      await createEvent({ title, date });
      setTitle('');
      setDate('');
      fetchEvents();
    } catch {
      setError('Failed to create event.');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
        await deleteEvent(eventId);
        fetchEvents();
    } catch {
        setError('Failed to delete event.');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow h-full">
      <h1 className="text-2xl font-bold mb-4">Academic Calendar</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleCreateEvent} className="mb-6 p-4 border rounded-md">
        <h2 className="text-lg font-semibold mb-2">Add New Event</h2>
        <div className="flex flex-col md:flex-row gap-4">
            <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event Title"
            className="flex-grow border rounded-md p-2"
            />
            <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded-md p-2"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Add Event</button>
        </div>
      </form>

      <div className="space-y-3">
        {events.length > 0 ? events.map((event) => (
          <div key={event._id} className="flex items-center justify-between p-3 rounded-md bg-gray-50 border">
            <div>
              <p className="font-semibold">{event.title}</p>
              <p className="text-sm text-gray-600">
                {new Date(event.date).toLocaleDateString()} - (Created by: {event.createdBy.name})
              </p>
            </div>
            {(user.id === event.createdBy._id || user.role === 'admin') && (
                 <button onClick={() => handleDeleteEvent(event._id)} className="text-red-500 hover:text-red-700">
                    Delete
                </button>
            )}
          </div>
        )) : <p>No events scheduled.</p>}
      </div>
    </div>
  );
};

export default CalendarPage;
