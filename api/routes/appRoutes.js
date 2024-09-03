const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

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

module.exports = router;
