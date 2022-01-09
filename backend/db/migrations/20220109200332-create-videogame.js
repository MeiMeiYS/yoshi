'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Videogames', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      genreId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Genres'}
      },
      platformId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Platforms'}
      },
      imageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Images'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Videogames');
  }
};
