// src/app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// --- START: Production-ready CORS configuration ---
// Read allowed origins from an environment variable.
// Default to allowing only the local frontend for development.
const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:5173'];

console.log('Allowed CORS Origins:', allowedOrigins); // Add this log to see what Render is using

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
    req.io = app.get('io');
    next();
});

app.use('/api', routes);

module.exports = app;
