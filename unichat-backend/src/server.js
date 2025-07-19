// src/server.js
require('dotenv').config({ path: './.env' });
const app = require('./app');
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// --- START: Simpler Socket.IO CORS Configuration ---
const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:5173'];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});
// --- END: Simpler Socket.IO CORS Configuration ---

app.set('io', io);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
