const express = require('express');
const router = express.Router();
const { calculateAverage } = require('../utils/calculator');

router.post('/average', (req, res) => {
  try {
    const result = calculateAverage(req.body.numbers);
    res.json({ average: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
