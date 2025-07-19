// src/app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// --- START: Simpler & More Robust CORS Configuration ---
const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
// --- END: Simpler & More Robust CORS Configuration ---

app.use(express.json());

app.use((req, res, next) => {
    req.io = app.get('io');
    next();
});

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;
