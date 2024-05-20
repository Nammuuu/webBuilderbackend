// routes/plans.js
const express = require('express');
const Plan = require('../models/Plan');


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const newPlan = new Plan({ name, price, description });
    await newPlan.save();
    res.json(newPlan);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// routes/plans.js (add this at the bottom)

router.post('/buy', async (req, res) => {
  const { planId, token } = req.body;
  try {
    const plan = await Plan.findById(planId);
    const charge = await stripe.charges.create({
      amount: plan.price * 100, // Stripe amount is in cents
      currency: 'usd',
      description: plan.description,
      source: token.id,
    });
    res.json(charge);
  } catch (err) {
    res.status(500).send('Server error');
  }
});



module.exports = router;
