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
      references: {
        model: 'Videogames',
        key: 'id'
      },
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Images',
        key: 'id'
      },
    }
  }, {});

  Party.associate = function(models) {
    // associations can be defined here
    Party.belongsTo(models.Videogame, { foreignKey: 'gameId' });
    Party.belongsTo(models.User, { foreignKey: 'ownerId' });
    Party.belongsTo(models.Image, { foreignKey: 'imageId' });

    const requestMapping = {
      through: 'Request',
      otherKey: 'userId',
      foreignKey: 'partyId'
    }
    Party.belongsToMany(models.User, requestMapping);

    const partyUserMapping = {
      through: 'PartyUser',
      otherKey: 'userId',
      foreignKey: 'partyId'
    }
    Party.belongsToMany(models.User, partyUserMapping);

    Party.hasMany(models.PartyChat, { foreignKey: 'partyId' });
  };

  Party.get12Parties = async function () {
    const { Videogame, User, Image } = this.associations;
    return await Party.findAll({ include: [Videogame, User, Image] });
    // return await Party.findAll({ include: [
    //   {model: Videogame, include: {model: Image}},
    //   {model: User, include: {model: Image} },
    //     Image] });
    //^^^ This does not work so I have to move code into router due to scope.
  };


  Party.getPartyById = async function (id) {
    const { Videogame, User, Image } = this.associations;
    return await Party.findByPk(id, { include: [Videogame, User, Image] });
  };

  return Party;
};
