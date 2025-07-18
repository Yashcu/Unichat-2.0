// src/app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

// Middleware to attach io to each request
const { io } = require('./server'); // Import io from server.js
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api', routes);

module.exports = app;