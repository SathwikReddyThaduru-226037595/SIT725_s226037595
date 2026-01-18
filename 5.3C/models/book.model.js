const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  genre: String,
  summary: String,
  image: String,
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  }
});

module.exports = mongoose.model('Book', bookSchema);
