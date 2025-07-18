// src/server.js
require('dotenv').config({ path: './.env' });
const app = require('./app');
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// We are exporting 'io' so it can be used in app.js
module.exports.io = io;

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', (roomId) => {
    console.log('Socket', socket.id, 'joining room', roomId);
    socket.join(roomId);
  });

  socket.on('sendMessage', (data) => {
    console.log("Emitting to room:", data.roomId, "Message:", data.message);
    io.to(data.roomId).emit('receiveMessage', data.message);
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