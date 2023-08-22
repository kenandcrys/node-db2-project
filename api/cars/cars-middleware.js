const db = require('./cars-model')

const checkCarId = async (req, _res, next) => {
  try {
    const id = req.params.id; 
    if (id) {
      const car = await db.getById(id);
      if (car) {
        next();
      } else {
        next({
          status: 404,
          message: `Car with id ${id} is not found`
        });
      }
    } else {
      next({
        status: 400,
        message: 'Missing car id'
      });
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  
}

const checkVinNumberValid = (req, res, next) => {
 
}

const checkVinNumberUnique = (req, res, next) => {
  
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}