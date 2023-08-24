const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars')
           .where('id', id)
           .first();
}

const create = (newCarData) => {
  return db('cars')
           .insert(newCarData)
           .then(ids => {
      return getById(ids[0]);
    });
}

module.exports = {
  getAll,
  getById,
  create,
}