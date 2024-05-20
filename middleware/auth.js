// // routes/auth.js
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const router = express.Router();

// router.post('/register', async (req, res) => {
//   const { username, password, plan } = req.body;
//   try {
//     let user = await User.findOne({ username });
//     if (user) return res.status(400).json({ msg: 'User already exists' });

//     user = new User({ username, password, plan });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);

//     await user.save();

//     const payload = { user: { id: user.id } };
//     jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
//       if (err) throw err;
//       res.json({ token });
//     });
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// });

// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     let user = await User.findOne({ username });
//     if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

//     const payload = { user: { id: user.id } };
//     jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
//       if (err) throw err;
//       res.json({ token });
//     });
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;


// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

