// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Event = require('./models/Event');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cityeventsDB';
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// API: get all events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find({}).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: get single event by slug
app.get('/api/events/slug/:slug', async (req, res) => {
  try {
    const ev = await Event.findOne({ slug: req.params.slug });
    if (!ev) return res.status(404).json({ error: 'Not found' });
    res.json(ev);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// fallback to index.html for SPA routing (make sure file exists)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`CityEvents app running on http://localhost:${port}`);
});
