'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    url: {
      type: DataTypes.STRING(600),
      allowNull: false,
      validate: {
        len: [6, 600]
      }
    }
  }, {});

  Image.associate = function(models) {
    // associations can be defined here
    Image.hasMany(models.User, { foreignKey: 'imageId' });
    Image.hasMany(models.Party, { foreignKey: 'imageId' });
  };

  Image.getImageById = async function (id) {
    return await Image.findByPk(id);
  };

  return Image;
};
