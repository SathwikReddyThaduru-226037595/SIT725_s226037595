const mongoose = require('mongoose');
const Book = require('./models/book.model');

mongoose.connect('mongodb://localhost:27017/sit725_books');

const books = [
  {
    title: "The Three-Body Problem",
    author: "Liu Cixin",
    year: 2008,
    genre: "Science Fiction",
    summary: "First novel in the Remembrance of Earth's Past trilogy.",
    image: "/images/b1.jpg",
    price: mongoose.Types.Decimal128.fromString("29.99")
  },
  {
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    year: 1847,
    genre: "Classic",
    summary: "An orphaned governess discovers independence.",
    image: "/images/b2.jpeg",
    price: mongoose.Types.Decimal128.fromString("22.00")
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    genre: "Classic",
    summary: "Manners, marriage, and misunderstandings.",
    image: "/images/b3.jpg",
    price: mongoose.Types.Decimal128.fromString("22.00")
  },
  {
    title: "The English Patient",
    author: "Michael Ondaatje",
    year: 1992,
    genre: "Historical Fiction",
    summary: "Lives intersect at the end of WWII.",
    image: "/images/b4.jpg",
    price: mongoose.Types.Decimal128.fromString("25.39")
  },
  {
    title: "Small Gods",
    author: "Terry Pratchett",
    year: 1992,
    genre: "Fantasy",
    summary: "Faith, philosophy, and satire.",
    image: "/images/b5.jpg",
    price: mongoose.Types.Decimal128.fromString("31.99")
  }
];

const seed = async () => {
  await Book.deleteMany();
  await Book.insertMany(books);
  console.log('Database seeded');
  process.exit();
};

seed();
