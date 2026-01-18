const express = require('express');
const app = express();
const mathRoutes = require('./routes/math.routes');

app.use(express.json());
app.use('/api/math', mathRoutes);

module.exports = app;
