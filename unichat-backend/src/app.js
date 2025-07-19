// src/app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Production-ready CORS configuration
const allowedOrigins = [
    'http://localhost:5173', // Your local frontend for testing
    // We will add your live frontend URL here later
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
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
