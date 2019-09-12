const Joi = require('joi')
const mongoose = require('mongoose')

const rentalSchema = new mongoose.Schema({
  customer: new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255
    },
    isGold: {
      type: Boolean,
      required: true
    },
    phone: {
      type: Number,
      required: true,
      maxlength: 50
    }
  }),
  movie: new mongoose.Schema({
    title: {
      type: String,
      required: true,
      maxlength: 255,
      minlength: 3
    },
    dailyRentalRate: {
      type: String,
      required: true,
      min: 0,
      max: 255
    },
    dateReturned: {
      type: Date
    },
    rentalFee: {
      type: Number,
      min: 0
    }
  })
})

const Rental = mongoose.model('Rental', rentalSchema)

function Validate (rental) {
  const schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required()
  }
  return Joi.validate(rental, schema)
}

module.exports = {
  Rental,
  rentalSchema,
  Validate
}
