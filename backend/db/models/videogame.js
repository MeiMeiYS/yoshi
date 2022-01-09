'use strict';
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
      references: {model: 'Genres'}
    },
    platformId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Platforms'}
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'Images'}
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
    return await Videogame.findAll();
  };

  Videogame.getVideogameById = async function (id) {
    return await Videogame.findByPk(id);
  };

  return Videogame;
};
