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

router.get('/:id', md.checkCarId, async (req, res, next) => {
  try {
    const id = req.params.id;
    const car = await Car.getById(id);
    res.status(200).json(car);
  } catch (error) {
    next(error);
  }
});

router.post('/', md.checkCarPayload, md.checkVinNumberUnique, md.checkVinNumberValid, async (req, res, next) => {
  try {
    const newCar = await Car.create(req.body);
    res.status(201).json(newCar);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
