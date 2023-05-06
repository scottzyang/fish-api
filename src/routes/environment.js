const express = require('express');
const router = express.Router();
const Environment = require('../models/environment');

router.get('/', async (req, res) => {
  try {
    const environments = await Environment.find();
    return res.json({ environments });
  } catch (err) {
    throw err.message;
  }
});

module.exports = router;
