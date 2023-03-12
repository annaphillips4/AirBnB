'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    await queryInterface.bulkInsert(options, [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jeff',
        lastName: 'Winger',
        email: 'user1@user.io',
        username: 'Wingman',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Britta',
        lastName: 'Perry',
        email: 'user2@user.io',
        username: 'Buzzkill',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Abed',
        lastName: 'Nadir',
        email: 'user3@user.io',
        username: 'FourthWall',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Annie',
        lastName: 'Edison',
        email: 'user4@user.io',
        username: 'Tight_Ship',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Shirley',
        lastName: 'Bennet',
        email: 'user5@user.io',
        username: '3Kids',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Ben',
        lastName: 'Chang',
        email: 'user6@user.io',
        username: 'El_Tigre_Chino',
        hashedPassword: bcrypt.hashSync('password5')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {});
  }
};
