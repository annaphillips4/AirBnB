'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, [
      {
        address: '404 Itsa St',
        city: 'Bluff',
        state: 'Alaska',
        county: 'Hamlet',
        lat: 64.2008,
        lng: 149.4937,
        name: 'A Real Spot',
        description: 'This is a description for a spot that really does exist.',
        price: 50,
        avgRating: 3.8,
        previewImage: null,
        ownerId: 1,
      },
      {
        address: '65 Millago Ln',
        city: 'Dinosaur',
        state: 'Colorado',
        county: 'Moffat',
        lat: 40.2436,
        lng: 109.0146,
        name: 'Stygimoloch',
        description: 'Lots of knobs and boney spikes on the roof. Vegetarians only.',
        price: 150,
        avgRating: 4.9,
        previewImage: null,
        ownerId: 1,
      },
      {
        address: '707 Ehsure Way',
        city: 'Whynot',
        state: 'North Carolina',
        county: 'Randolph',
        lat: 35.5403,
        lng: 79.7480,
        name: 'Give It a Go',
        description: `I mean, I think you should stay here. Whadda ya got to lose, right?`,
        price: 20,
        avgRating: 2.1,
        previewImage: null,
        ownerId: 2,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: {[Op.in]: [
        'A Real Spot',
        'Stygimoloch',
        'Give It a Go'
      ]}
    }, {});
  }
};
