'use strict';
// const db = require('./index');
// console.log('!!!!!!!!!!!!!!!!', db.Image)

module.exports = (sequelize, DataTypes) => {
  const Videogame = sequelize.define('Videogame', {
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
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Genres',
        key: 'id'
      },
    },
    platformId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Platforms',
        key: 'id'
      },
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Images',
        key: 'id'
      },
    }
  }, {});

  Videogame.associate = function(models) {
    // associations can be defined here
    Videogame.belongsTo(models.Genre, { foreignKey: 'genreId' });
    Videogame.belongsTo(models.Platform, { foreignKey: 'platformId' });
    Videogame.belongsTo(models.Image, { foreignKey: 'imageId' });
    Videogame.hasMany(models.Party, { foreignKey: 'gameId' });
  };

  Videogame.getAllVideogames = async function () {
    const { Genre, Platform, Image } = this.associations;
    return await Videogame.findAll({ include: [Genre, Platform, Image] });
  };

  Videogame.getVideogameById = async function (id) {
    const { Genre, Platform, Image } = this.associations;
    return await Videogame.findByPk(id, { include: [Genre, Platform, Image] });
  };

  return Videogame;
};
