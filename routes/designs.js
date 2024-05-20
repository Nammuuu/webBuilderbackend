// // routes/designs.js
// const express = require('express');
// const Design = require('../models/Design');
// const auth = require('../middleware/auth');

// const router = express.Router();

// // Save design
// router.post('/save', auth, async (req, res) => {
//   const { components } = req.body;
//   try {
//     let design = await Design.findOne({ userId: req.user.id });
//     if (!design) {
//       design = new Design({ userId: req.user.id, components });
//     } else {
//       design.components = components;
//     }
//     await design.save();
//     res.json(design);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// });

// // Load design
// router.get('/load', auth, async (req, res) => {
//   try {
//     const design = await Design.findOne({ userId: req.user.id });
//     res.json(design);
//   } catch (err) {
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;

// routes/designs.js
const express = require('express');
const Design = require('../models/Design');
const auth = require('../middleware/auth');

const router = express.Router();

// Save design
router.post('/save', auth, async (req, res) => {
  const { components } = req.body;
  try {
    let design = await Design.findOne({ userId: req.user.id });
    if (!design) {
      design = new Design({ userId: req.user.id, components });
    } else {
      design.components = components;
    }
    await design.save();
    res.json(design);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Load design
router.get('/load', auth, async (req, res) => {
  try {
    const design = await Design.findOne({ userId: req.user.id });
    if (!design) {
      return res.status(404).json({ msg: 'Design not found' });
    }
    res.json(design);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
