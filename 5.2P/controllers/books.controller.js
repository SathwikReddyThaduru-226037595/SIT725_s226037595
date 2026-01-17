// controllers/books.controller.js
const service = require('../services/books.service');

module.exports = {
  getAll: (req, res) => {
    const books = service.getAll();
    res.json(books);
  },
  getById: (req, res) => {
    const id = req.params.id;
    const book = service.getById(id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  }
};
