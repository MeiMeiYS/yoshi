'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Parties', {
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
        allowNull: false,
        type: Sequelize.TEXT
      },
      space: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      openStatus: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      gameId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Videogames'}
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Users'}
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
    return queryInterface.dropTable('Parties');
  }
};
