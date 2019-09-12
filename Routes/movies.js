const { Movie, Validate } = require('../models/movies.model')
const { Genre } = require('../models/genres.model')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  const movie = await Movie.find().sort('title')
  res.send(movie)
})

router.get('/:id', async (req, res) => {
  const moive = await Movie.findById(req.params.id)
  if (!moive) return res.status(404).send('Movie Not Found')
  res.send(moive)
})

router.post('/', async (req, res) => {
  const { error } = Validate(req.body)
  if (error) return res.status(400).send(error)

  const genre = await Genre.findById(req.body.genreId)
  if (!genre) return res.status(400).send('Genre Not Found')

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  })
  movie = await movie.save()
  res.send(movie)
})

router.put('/:id', async (req, res) => {
  const { error } = Validate(req.body)
  if (error) return res.status(400).send('Bad Request')

  const genre = await Genre.findById(req.body.genreId)
  if (!genre) return res.status(404).send('Genre Not Found')

  const movie = await Movie.findOneAndUpdate(req.params.id, {
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.numberInStock
  }, { new: true })
  if (!movie) return res.status(404).send('Movie not Found')
  res.send(movie)
})

router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id)
  if (!movie) return res.status(404).send('Movie Not Found')
  res.send(movie)
})

module.exports = router
