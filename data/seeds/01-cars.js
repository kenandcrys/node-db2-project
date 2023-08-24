const cars = [
  {
    vin: "11111111111111111",
    make: "Toyota",
    model: "Prius",
    mileage: 215000,
    title: "clean",
    transmission: "manual"
  },
  {
    vin: "11111111111111111",
    make: "Toyota",
    model: "corolla",
    mileage: 115000,
    title: "salvage",
  },
  {
    vin: "11111111111111111",
    make: "Ford",
    model: "Focus",
    mileage: 15000,
  },
  
]
exports.seed = async function(knex) {
  await knex('cars').truncate();
  await knex('cars').insert(cars);
}