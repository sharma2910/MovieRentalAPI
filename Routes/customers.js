const Joi = require('joi')
const express = require('express')
const router = express.Router()
const Customer = require('../models/customers.model')

router.get('/', async (req, res) => {
  res.send(await Customer.find().sort('name'))
})

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id)

  if (!customer) return res.status(404).send('Customer Not Found')

  res.send(customer)
})

router.post('/', async (req, res) => {
  const { error } = ValidateCustomer(req.body)
  if (error) return res.status(404).send('Bad Request')

  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  })
  customer = await customer.save()
  res.send(customer)
})

router.put('/:id', async (req, res) => {
  const { error } = ValidateCustomer(req.body)
  if (error) return res.status(400).send('Bad Request Body')

  const customer = await Customer.findByIdAndUpdate(req.params.id,
    {
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone
    },
    {
      new: true
    })

  if (!customer) return res.status(404).send('Customer Not Found')
  res.send(customer)
})

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id)
  if (!customer) return res.status(404).send('Customer Not Found')
  res.send(customer)
})

function ValidateCustomer (customer) {
  const schema = {
    isGold: Joi.boolean().required(),
    name: Joi.string().min(3).max(20).required(),
    phone: Joi.number().required()
  }
  return Joi.validate(customer, schema)
}

module.exports = router
