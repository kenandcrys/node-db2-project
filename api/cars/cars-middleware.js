const Car = require('./cars-model');
const vin = require('vin-validator');
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
  const isValidVin = vin.validate(req.body.vin);
  
  console.log(`Received VIN: ${req.body.vin}`);
  console.log(`Is Valid: ${isValidVin}`);
  
  if (isValidVin) {
    next();
  } else {
    next({
      status: 400,
      message: `vin ${req.body.vin} is invalid`
    });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const vin = req.body.vin;

    const allCars = await Car.getAll();
    const carWithSameVin = allCars.find(car => car.vin === vin);

    if (carWithSameVin) {
      return next({
        status: 400,
        message: `vin ${vin} already exists`,
      });
    }

    next();
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
