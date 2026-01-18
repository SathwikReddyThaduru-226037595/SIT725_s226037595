const Book = require('../models/book.model');

const getAllBooks = async () => {
  const books = await Book.find();
  return books.map(b => ({
    _id: b._id,
    title: b.title,
    author: b.author,
    year: b.year,
    genre: b.genre,
    summary: b.summary,
    image: b.image,
    price: b.price.toString()
  }));
};

const getBookById = async (id) => {
  const b = await Book.findById(id);
  if (!b) return null;

  return {
    _id: b._id,
    title: b.title,
    author: b.author,
    year: b.year,
    genre: b.genre,
    summary: b.summary,
    image: b.image,
    price: b.price.toString()
  };
};

module.exports = { getAllBooks, getBookById };
