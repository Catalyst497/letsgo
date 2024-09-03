const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Ride = require("../models/Ride");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

router.post("/ride", async (req, res) => {
  try {
    const newFormData = new Ride(req.body);
    await newFormData.save();
    res.status(201).json("Ride Added Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});
router.get("/ride", async (req, res) => {
  try {
    const rides = await Ride.find();
    res.json(rides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/ride/:id", async (req, res) => {
  try {
    const ride = await Ride.findByIdAndDelete(req.params.id);
    console.log(ride)
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    res.status(200).json({ message: "Ride deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
