// server.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const booksRoutes = require('./routes/books.routes');

const app = express();
const port = process.env.PORT || 3000;

/* middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/sit725_books')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));


/* static client */
app.use(express.static(path.join(__dirname, 'public')));

/* API routes */
app.use('/api/books', booksRoutes);

/* integrity check route (MANDATORY) */
app.get('/api/integrity-check42', (req, res) => {
  res.status(204).send();
});

/* SPA fallback */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Books MVC app listening on http://localhost:${port}`);
});
