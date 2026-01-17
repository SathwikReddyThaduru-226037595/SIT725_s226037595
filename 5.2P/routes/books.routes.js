// routes/books.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/books.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

module.exports = router;
