// server.js
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const events = [
  {
    id: 1,
    slug: "riverside-farmers-market",
    title: "Riverside Farmers Market",
    date: "2025-12-06",
    location: "glenroy",
    image: "/images/marketday.jpg",
    description: "Fresh produce, coffee stalls and live music."
  },
  {
    id: 2,
    slug: "coding-for-beginners-meetup",
    title: "Coding for Beginners Meetup",
    date: "2025-12-10",
    location: "deakin",
    image: "/images/codingmeet.jpg",
    description: "Introductory session on JavaScript and Node basics."
  },
  {
    id: 3,
    slug: "community-tree-planting",
    title: "Community Tree Planting",
    date: "2025-12-14",
    location: "westpark",
    image: "/images/commtreeplant.jpg",
    description: "Volunteer-driven tree planting event. Bring gloves!"
  }
];

app.get('/api/events', (req, res) => {
  res.json(events);
});

app.get('/api/events/:id', (req, res) => {
  const id = Number(req.params.id);
  const ev = events.find(e => e.id === id);
  if (!ev) return res.status(404).json({ error: 'Not found' });
  res.json(ev);
});

// fallback to index.html (SPA)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`CityEvents app running on http://localhost:${port}`);
});