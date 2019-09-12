const mongoose = require('mongoose')

const Customer = mongoose.model('Customer', new mongoose.Schema({
  isGold: {
    type: Boolean,
    required: true
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true
  },
  phone: {
    type: Number,
    required: true
  }
}))

module.exports = Customer
