const Car = require('./cars-model');
const vinValidator = require('vin-validator');
const db = require('../../data/db-config')
const checkCarId = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (id) {
      const car = await Car.getById(id);
      if (car) {
        next();
      } else {
        next({ status: 404, message: `Car with id ${id} is not found` });
      }
    } else {
      next({ status: 400, message: 'Missing car id' });
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
 
    if (!req.body.vin) return next({
      status:400,
      message: 'vin is missing'
    })
    if (!req.body.make) return next({
      status:400,
      message: 'make is missing'
    })
    if (!req.body.model) return next({
      status:400,
      message: 'model is missing'
    })
    if (req.body.mileage === undefined) return next({
      status:400,
      message: 'mileage is missing'
    })
    next()
};

const checkVinNumberValid = (req, res, next) => {
  next()
};

const checkVinNumberUnique = async (req, res, next) => {
  const vin = req.body.vin;
  try {
    const existingCar = await db('cars').where('vin', vin).first();
    if (existingCar) {
      next({ status: 400, message: `vin ${vin} already exists` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
