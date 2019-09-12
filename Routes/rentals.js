const express = require('express')
const router = express.Router()
const Customer = require('../models/customers.model')
const { Movie } = require('../models/movies.model')
const { Rental, Validate } = require('../models/rentals.model')

router.get('/', async (req, res) => {
  const rental = await Rental.find().sort('-dateOut')
  res.send(rental)
})

router.post('/', async (req, res) => {
  const { error } = Validate(req.body)
  if (error) return res.status(400).send(error)

  const customer = await Customer.findById(req.body.customerId)
  if (!customer) return res.status(404).send('Customer Not Found')

  const movie = await Movie.findById(req.body.movieId)
  if (!movie) return res.status(404).send('Movie Not Found')

  let rental = new Rental({
    customer: {
      _id: customer._id,
      isGold: customer.isGold,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  })

  rental = await rental.save()
  movie.numberInStock--
  movie.save()
})

module.exports = router
