// routes/domains.js
const express = require('express');
const Domain = require('../models/Domain');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/add', auth, async (req, res) => {
  const { domain, userId } = req.body;
  try {
    const newDomain = new Domain({ domain, userId });
    await newDomain.save();
    res.json(newDomain);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
