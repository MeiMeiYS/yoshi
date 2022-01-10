'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Genres', [
      {id: 1, name: 'Action'},
      {id: 2, name: 'Adventure & Casual'},
      {id: 3, name: 'Role-Playing'},
      {id: 4, name: 'Simulation'},
      {id: 5, name: 'Strategy'},
      {id: 6, name: 'Sports & Racing'},
      {id: 7, name: 'Horror/Mystery/Sci-Fi'},
      {id: 8, name: 'Survival'},
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Genres', null, {});
  }
};
