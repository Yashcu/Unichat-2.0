const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// --- START: Final CORS Configuration with Debugging ---
const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:5173'];

// LOG 1: See what URLs the server thinks are allowed
console.log('[CORS] Allowed Origins:', allowedOrigins);

const corsOptions = {
    origin: (origin, callback) => {
        // LOG 2: See the exact URL of the incoming request
        console.log('[CORS] Incoming Origin:', origin);

        // Allow requests with no origin (like Postman, mobile apps, etc.)
        if (!origin) return callback(null, true);

        // Check if the incoming origin is in our whitelist
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
