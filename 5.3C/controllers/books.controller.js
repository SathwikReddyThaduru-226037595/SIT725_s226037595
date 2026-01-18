const service = require('../services/books.service');

exports.getAllBooks = async (req, res) => {
  const books = await service.getAll();
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await service.getById(req.params.id);
  if (!book) return res.status(404).end();
  res.json(book);
};

exports.integrityCheck = (req, res) => {
  res.status(204).end();
};
