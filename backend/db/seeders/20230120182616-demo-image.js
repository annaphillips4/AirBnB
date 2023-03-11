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
        url: 'https://res.cloudinary.com/duakjbyfi/image/upload/v1678551282/AirBnB%20Clone/1/1prevImg_nyivsu.webp',
        preview: true,
        spotId: 1,
        reviewId: null,
      },
      {
        url: 'https://res.cloudinary.com/duakjbyfi/image/upload/v1678551282/AirBnB%20Clone/1/1img2_yj73uf.webp',
        preview: false,
        spotId: 1,
        reviewId: null,
      },
      {
        url: 'https://res.cloudinary.com/duakjbyfi/image/upload/v1678551282/AirBnB%20Clone/1/1img4_ivehoh.webp',
        preview: false,
        spotId: 1,
        reviewId: null,
      },
      {
        url: 'https://res.cloudinary.com/duakjbyfi/image/upload/v1678551282/AirBnB%20Clone/1/1img3_yesemg.webp',
        preview: false,
        spotId: 1,
        reviewId: null,
      },
      {
        url: 'https://res.cloudinary.com/duakjbyfi/image/upload/v1678551282/AirBnB%20Clone/1/1img1_ctfmki.webp',
        preview: false,
        spotId: 1,
        reviewId: null,
      },
      {
        url: 'https://res.cloudinary.com/duakjbyfi/image/upload/v1678554787/AirBnB%20Clone/2/2prevImg_npsuph.webp',
        preview: true,
        spotId: 2,
        reviewId: null,
      },
      {
        url: 'https://res.cloudinary.com/duakjbyfi/image/upload/v1678554787/AirBnB%20Clone/2/2img1_o0zazy.webp',
        preview: false,
        spotId: 2,
        reviewId: null,
      },
      {
        url: 'https://res.cloudinary.com/duakjbyfi/image/upload/v1678554787/AirBnB%20Clone/2/2img4_akshsu.webp',
        preview: false,
        spotId: 2,
        reviewId: null,
      },
      {
        url: 'https://res.cloudinary.com/duakjbyfi/image/upload/v1678554787/AirBnB%20Clone/2/2img2_n2xhef.webp',
        preview: false,
        spotId: 2,
        reviewId: null,
      },
      {
        url: 'https://res.cloudinary.com/duakjbyfi/image/upload/v1678554787/AirBnB%20Clone/2/2img3_xztcf7.webp',
        preview: false,
        spotId: 2,
        reviewId: null,
      },
      {
        url: 'https://res.cloudinary.com/duakjbyfi/image/upload/v1678559241/AirBnB%20Clone/prevImgs/spot3_yarhxl.webp',
        preview: true,
        spotId: 3,
        reviewId: null,
      },
      {
        url: 'https://res.cloudinary.com/duakjbyfi/image/upload/v1678559241/AirBnB%20Clone/prevImgs/spot4_lcqfzu.webp',
        preview: true,
        spotId: 4,
        reviewId: null,
      },
      {
        url: 'https://res.cloudinary.com/duakjbyfi/image/upload/v1678559241/AirBnB%20Clone/prevImgs/spot5_eh2eo0.webp',
        preview: true,
        spotId: 5,
        reviewId: null,
      },
      {
        url: 'https://res.cloudinary.com/duakjbyfi/image/upload/v1678559241/AirBnB%20Clone/prevImgs/spot6_nubjbh.webp',
        preview: true,
        spotId: 6,
        reviewId: null,
      },
      {
        url: 'https://res.cloudinary.com/duakjbyfi/image/upload/v1678559241/AirBnB%20Clone/prevImgs/spot7_jadzbh.webp',
        preview: true,
        spotId: 7,
        reviewId: null,
      },
      {
        url: 'https://res.cloudinary.com/duakjbyfi/image/upload/v1678559241/AirBnB%20Clone/prevImgs/spot8_uxmzto.webp',
        preview: true,
        spotId: 8,
        reviewId: null,
      },
      {
        url: 'https://res.cloudinary.com/duakjbyfi/image/upload/v1678559241/AirBnB%20Clone/prevImgs/spot9_z71wmf.webp',
        preview: true,
        spotId: 9,
        reviewId: null,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {});
  }
};
