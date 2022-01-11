'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-User',
        hashedPassword: bcrypt.hashSync('password'),
        imageId: 1
      },
      {
        email: 'demo2@user.io',
        username: 'eventually_561',
        hashedPassword: bcrypt.hashSync('password'),
        imageId: 2
      },
      {
        email: 'demo3@user.io',
        username: 'Reactor91',
        hashedPassword: bcrypt.hashSync('password'),
        imageId: 3
      },
      {
        email: 'demo4@user.io',
        username: 'Gamembie_bear',
        hashedPassword: bcrypt.hashSync('password'),
        imageId: 4
      },
      {
        email: 'demo5@user.io',
        username: 'LilGamer_o3O',
        hashedPassword: bcrypt.hashSync('password'),
        imageId: 5
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', null, {});
  }
};
