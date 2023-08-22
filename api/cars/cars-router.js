// DO YOUR MAGIC
const router = require('express').Router();
const md = require('./cars-middleware');
const Car = require('./cars-model');



router.get('/', async (req, res, next) => {
    try {
      const cars = await Car.getAll();
      res.status(200).json(cars);
    } catch (error) {
      next(error);
    }
  });

router.get('/:id', md.checkCarId, (req, res, next) => {
    
})

router.post('/',
     md.checkCarPayload,
     md.checkVinNumberUnique,
     md.checkVinNumberValid,
     (req, res, next) => {

     })

module.exports = router;