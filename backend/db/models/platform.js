'use strict';
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Platform = sequelize.define('Platform', {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 30]
      }
    }
  }, {});

  Platform.associate = function(models) {
    // associations can be defined here
    Platform.hasMany(models.Videogame, { foreignKey: 'genreId' });
  };

  Platform.getAllPlatforms = async function () {
    return await Platform.findAll();
  };

  Platform.getPlatformById = async function (id) {
    return await Platform.findByPk(id);
  };

  return Platform;
};
