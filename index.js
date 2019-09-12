const express = require('express')
const app = express()
const gernes = require('./Routes/genres')
const customers = require('./Routes/customers')
const movies = require('./Routes/movies')
const rental = require('./Routes/rentals')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/Vidly')
  .then(() => console.log('Connected To MongoDB ....'))
  .catch(err => console.log('Error Connecting to MongoDB ...', err.message))

app.use(express.json())
app.use('/api/genres', gernes)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rental', rental)

const port = 3000 || process.env.PORT

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
