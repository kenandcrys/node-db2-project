// STRETCH
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('cars').del()
      .then(function () {
        // Inserts seed entries
        return knex('cars').insert([
          {
            vin: '12345678901234567',
            make: 'Toyota',
            model: 'Camry',
            mileage: 50000,
            title: 'Clean',
            transmission: 'Automatic'
          },
          {
            vin: '23456789012345678',
            make: 'Honda',
            model: 'Civic',
            mileage: 40000,
            title: 'Salvage',
            transmission: 'Manual'
          },
          // Add more seed data as needed
        ]);
      });
  };
  