const Book = require('../models/book.model');

module.exports = {
  getAll: async () => {
    return await Book.find();
  },

  getById: async (id) => {
    return await Book.findById(id);
  }
};
