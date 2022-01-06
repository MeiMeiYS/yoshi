'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'demo2@user.io',
        username: 'Demo-lition-two',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'shihmeiyin@gmail.com',
        username: 'MeiMei',
        hashedPassword: bcrypt.hashSync('MeiMei@password'),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'Demo-lition-two', 'MeiMei'] }
    }, {});
  }
};
