'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        startDate: new Date(2023, 2, 1),
        endDate: new Date(2023, 2, 3),
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date(2023, 1, 28),
        endDate: new Date(2023, 2, 5),
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date(2023, 2, 3),
        endDate: new Date(2023, 2, 6),
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date(2023, 2, 1),
        endDate: new Date(2023, 2, 2),
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date(2023, 2, 8),
        endDate: new Date(2023, 2, 10),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null)
  }
};
