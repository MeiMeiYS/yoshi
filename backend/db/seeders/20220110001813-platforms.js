'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Platforms', [
      {id: 1, name: 'PC'},
      {id: 2, name: 'Xbox'},
      {id: 3, name: 'Playstation 5'},
      {id: 4, name: 'Playstation 4'},
      {id: 5, name: 'Playstation 3'},
      {id: 6, name: 'Nintendo Switch'},
      {id: 7, name: 'Wii U'},
      {id: 8, name: 'Mobile'}
  ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Platforms', null, {});
  }
};
