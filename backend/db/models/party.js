'use strict';
module.exports = (sequelize, DataTypes) => {
  const Party = sequelize.define('Party', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 255]
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    space: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    openStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'VideoGames'}
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Users'}
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Images'}
    }
  }, {});

  Party.associate = function(models) {
    // associations can be defined here
    Party.belongsTo(models.VideoGame, { foreignKey: 'gameId' });
    Party.belongsTo(models.User, { foreignKey: 'ownerId' });
    Party.belongsTo(models.Image, { foreignKey: 'imageId' });
  };

  Party.getAllParties = async function () {
    return await Party.findAll();
  };

  Party.getPartyById = async function (id) {
    return await Party.findByPk(id);
  };

  return Party;
};