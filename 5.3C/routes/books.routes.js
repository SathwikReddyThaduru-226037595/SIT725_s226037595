const express = require('express');
const router = express.Router();
const controller = require('../controllers/books.controller');

// REQUIRED integrity route FIRST
router.get('/integrity-check42', (req, res) => {
  res.status(204).send();
});

router.get('/', controller.getAllBooks);
router.get('/:id', controller.getBookById);

module.exports = router;
