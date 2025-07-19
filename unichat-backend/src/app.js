// src/app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

// This is where we will attach the io object later
app.use((req, res, next) => {
    req.io = app.get('io');
    next();
});

app.use('/api', routes);

module.exports = app;