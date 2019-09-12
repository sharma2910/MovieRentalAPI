const mongoose = require('mongoose')
const Joi = require('joi')
const { genreSchema } = require('./genres.model')

const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    max: 255
  }
}))

function Validate (movie) {
  const schema = {
    title: Joi.string().min(3).max(100).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required()
  }

  return Joi.validate(movie, schema)
}

module.exports = {
  Movie,
  Validate
}
