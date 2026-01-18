const express = require('express');
const router = express.Router();
const controller = require('../controllers/books.controller');

router.get('/', controller.getAllBooks);
router.get('/:id', controller.getBookById);

// REQUIRED BY TASK
router.get('/integrity-check42', (req, res) => {
  res.status(204).send();
});

module.exports = router;
