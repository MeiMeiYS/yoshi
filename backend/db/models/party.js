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
      references: {model: 'Videogames'}
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

    const requestMapping = {
      through: 'Request',
      otherKey: 'userId',
      foreignKey: 'partyId'
    }
    Party.belongsTo(models.User, requestMapping);

    const partyUserMapping = {
      through: 'PartyUser',
      otherKey: 'userId',
      foreignKey: 'partyId'
    }
    Party.belongsTo(models.User, partyUserMapping);

    Party.hasMany(models.PartyChat, { foreignKey: 'partyId' });
  };

  Party.getAllParties = async function () {
    return await Party.findAll();
  };

  Party.getPartyById = async function (id) {
    return await Party.findByPk(id);
  };

  return Party;
};
