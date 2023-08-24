const Car = require('./cars-model');
const vinValidator = require('vin-validator');

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
  const { vin, make, model, mileage } = req.body;
  if (!vin || !make || !model || mileage === undefined) {
    next({ status: 400, message: 'vin, make, model, and mileage are required fields' });
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  const vin = req.body.vin;
  if (!vinValidator.validate(vin)) {
    next({ status: 400, message: `vin ${vin} is invalid` });
  } else {
    next();
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  const vin = req.body.vin;
  try {
    const existingCar = await Car.getByVin(vin);
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
