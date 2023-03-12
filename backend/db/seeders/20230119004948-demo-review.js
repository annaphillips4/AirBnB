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
        userId: 2,
        spotId: 1,
        review: `Well designed, efficient and unique.`,
        stars: 4,
      },
      {
        userId: 3,
        spotId: 1,
        review: `Perfect in every way for me! This was small, quiet, relaxing and everything as described. Record collection is amazing but is a unique taste. The no TV was just what the doctor ordered for this woman. I would stay again and recommend to anyone looking for a nice solitude getaway.`,
        stars: 5,
      },
      {
        userId: 4,
        spotId: 1,
        review: `Really cute and excellent space. Fun amenities like the record player, but overall it's an efficient tiny house with everything you need. Important to know the location is behind another house (in the back yard) but access is easy and it feels pretty private once you're back there. Really appreciate the details and thought put into this great space.`,
        stars: 5,
      },
      {
        userId: 5,
        spotId: 1,
        review: `Great place tucked away - it's a little oasis behind the front house! Would stay again - really nicely designed and the records were dope.`,
        stars: 5,
      },
      {
        userId: 6,
        spotId: 1,
        review: `Great location. Very unique house. Less than 10 minutes to anywhere in central austin.`,
        stars: 5,
      },
      {
        userId: 7,
        spotId: 1,
        review: `Cute house, great for wanting to stay outside the city and get away. No cell service or tv. Clean inside the house.`,
        stars: 3,
      },
      {
        userId: 6,
        spotId: 2,
        review: `Love love love!!! This place peaceful and private, an perfect love scape.`,
        stars: 5,
      },
      {
        userId: 5,
        spotId: 2,
        review: `I was not able to connect to the WIFI but didn't have problems getting cell phone signal. Make sure you bring your own food. The ad says breakfast is provided and all the reviews mention this great breakfast being left at your door. We drove four hours to stay one night here. Price is a little high.`,
        stars: 2,
      },
      {
        userId: 4,
        spotId: 2,
        review: `Such a unique stay! Hosts were very helpful and responsive. The only bad thing was that the shower and sink water had a bad smell.`,
        stars: 4,
      },
      {
        userId: 2,
        spotId: 3,
        review: `Sample review text.`,
        stars: 4,
      },
      {
        userId: 3,
        spotId: 3,
        review: `Sample review text.`,
        stars: 5,
      },
      {
        userId: 4,
        spotId: 3,
        review: `Sample review text.`,
        stars: 1,
      },
      {
        userId: 5,
        spotId: 3,
        review: `Sample review text.`,
        stars: 1,
      },
      {
        userId: 6,
        spotId: 3,
        review: `Sample review text.`,
        stars: 2,
      },
      {
        userId: 7,
        spotId: 3,
        review: `Sample review text.`,
        stars: 4,
      },
      {
        userId: 1,
        spotId: 4,
        review: `Sample review text.`,
        stars: 4,
      },
      {
        userId: 3,
        spotId: 4,
        review: `Sample review text.`,
        stars: 5,
      },
      {
        userId: 4,
        spotId: 4,
        review: `Sample review text.`,
        stars: 4,
      },
      {
        userId: 5,
        spotId: 4,
        review: `Sample review text.`,
        stars: 4,
      },
      {
        userId: 6,
        spotId: 4,
        review: `Sample review text.`,
        stars: 3,
      },
      {
        userId: 7,
        spotId: 4,
        review: `Sample review text.`,
        stars: 4,
      },
      {
        userId: 1,
        spotId: 5,
        review: `Sample review text.`,
        stars: 4,
      },
      {
        userId: 1,
        spotId: 6,
        review: `Sample review text.`,
        stars: 1,
      },
      {
        userId: 1,
        spotId: 7,
        review: `Sample review text.`,
        stars: 3,
      },
      {
        userId: 1,
        spotId: 8,
        review: `Sample review text.`,
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
