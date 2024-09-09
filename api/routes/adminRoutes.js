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

router.get("/protectedroute", (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    try {
      if (err) {
        res.json({ auth: false, message: "You failed to authenticate" });
      } else {
        req.userId = decoded.id;
        let user = await User.findById(decoded.id);
        user = { ...user._doc, password: null };
        return res.status(200).json({
          auth: true,
          message: "Yeah, User is logged in.",
          user,
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
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
    console.log(ride);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }
    res.status(200).json({ message: "Ride deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
