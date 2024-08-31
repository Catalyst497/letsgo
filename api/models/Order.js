const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
  fromCity: {
    type: String,
    required: true,
  },
  toCity: {
    type: String,
    required: true,
  },
  selectedTime: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const User = mongoose.model('Order', orderSchema);

module.exports = User;
