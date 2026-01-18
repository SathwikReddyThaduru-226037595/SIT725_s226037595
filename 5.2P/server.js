// server.js
const express = require('express');
const path = require('path');

const booksRoutes = require('./routes/books.routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static client files from /public
app.use(express.static(path.join(__dirname, 'public')));

// API routes (mounted before SPA fallback)
app.use('/api/books', booksRoutes);

// SPA fallback to index.html (for client-side routing)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Books MVC app listening on http://localhost:${port}`);
});