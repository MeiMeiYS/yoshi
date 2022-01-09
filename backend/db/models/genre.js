'use strict';
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 30]
      }
    }
  }, {});

  Genre.associate = function(models) {
    // associations can be defined here
  };

  Genre.getAllGenres = async function () {
    return await Genre.findAll();
  };

  Genre.getGenreById = async function (id) {
    return await Genre.findByPk(id);
  };

  return Genre;
};
