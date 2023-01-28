'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
      {
        userId: 3,
        spotId: 1,
        review: `Couldn't find it`,
        stars: 1,
      },
      {
        userId: 2,
        spotId: 2,
        review: 'Dated and dusty but worth the adventure!',
        stars: 4,
      },
      {
        userId: 1,
        spotId: 3,
        review: 'It was fine ig',
        stars: 3,
      },
      {
        userId: 2,
        spotId: 1,
        review: `Terrific!`,
        stars: 5,
      },
      {
        userId: 3,
        spotId: 2,
        review: 'Okay!',
        stars: 3,
      },
      {
        userId: 3,
        spotId: 3,
        review: 'Stayed here',
        stars: 2,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {});
  }
};
