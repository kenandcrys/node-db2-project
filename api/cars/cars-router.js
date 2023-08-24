const express = require('express');
const router = express.Router();
const md = require('./cars-middleware');
const Car = require('./cars-model');

router.get('/', async (req, res, next) => {
  try {
    const cars = await Car.getAll();
    const sortedCars = cars.sort((a, b) => a.id - b.id);
    res.status(200).json(sortedCars);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next)=> {
  res.json(`getting car with id ${req.params.id}`)
})

router.get('/', async (req, res, next)=> {
  res.json('posting new car')
})




module.exports = router;
