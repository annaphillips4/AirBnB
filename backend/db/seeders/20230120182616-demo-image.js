'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Images';
    await queryInterface.bulkInsert(options, [
      {
        url: 'spot1.url',
        preview: true,
        spotId: 1,
        reviewId: null,
      },
      {
        url: 'spot2.url',
        preview: true,
        spotId: 2,
        reviewId: null,
      },
      {
        url: 'spot3.url',
        preview: true,
        spotId: 3,
        reviewId: null,
      },
      {
        url: 'review1.url',
        preview: false,
        spotId: 1,
        reviewId: 1,
      },
      {
        url: 'review2.url',
        preview: false,
        spotId: 2,
        reviewId: 2,
      },
      {
        url: 'review3.url',
        preview: false,
        spotId: 3,
        reviewId: 3,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {});
  }
};
