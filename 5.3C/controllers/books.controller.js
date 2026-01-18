const service = require('../services/books.service');

exports.getAllBooks = async (req, res) => {
  const books = await service.getAllBooks();
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await service.getBookById(req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
};
