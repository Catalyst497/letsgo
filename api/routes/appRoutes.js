const express = require("express");
const router = express.Router();
const axios = require("axios")
const Order = require("../models/Order");
const Ride = require("../models/Ride");

router.post("/bookform", async function (req, res) {
  try {
    const { email, fromCity, toCity, time } = req.body;
    const newFormData = new Order({
      email,
      fromCity,
      toCity,
      selectedTime: time,
    });
    await newFormData.save();
    res.status(201).json("Order Successful");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/checkforride", async function(req, res) {
  try {
    const rides = await Ride.find({ fromCity: req.query.fromCity, toCity: req.query.toCity, time: req.query.time });
    console.log(rides);
    res.json({length:rides.length, rides: rides});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.post("/initTransaction", async function (req, res) {
  const { email, amount } = req.body;
console.log(req.body)
  try {
    const response = await axios.post('https://api.paystack.co/transaction/initialize', {
      email,
      amount: amount * 100, // Paystack expects the amount in kobo
    }, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Replace with your actual secret key
      },
    });

    res.json({
      status: 'success',
      authorization_url: response.data.data.authorization_url,
      access_code: response.data.data.access_code,
      reference: response.data.data.reference,
    });
  } catch (error) {
    console.error(error.response.data);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while initializing the transaction',
    });
  }
})

module.exports = router;
