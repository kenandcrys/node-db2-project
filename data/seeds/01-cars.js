const cars = [
  {
    vin: "1HGCM82633A123456",
    make: "Toyota",
    model: "Prius",
    mileage: 215000,
    title: "clean",
    transmission: "manual"
  },
  {
    vin: "2C3KA63H76H123456",
    make: "Toyota",
    model: "corolla",
    mileage: 115000,
    title: "salvage",
  },
  {
    vin: "5YJSA1CN6DFP12345",
    make: "Ford",
    model: "Focus",
    mileage: 15000,
  },
  
]
exports.seed = async function(knex) {
  await knex('cars').truncate();
  await knex('cars').insert(cars);
}