'use strict';

module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    partyId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Parties',
        key: 'id'
      },
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
    }
  }, {});

  Request.associate = function(models) {
    // associations can be defined here
  };

  return Request;
};
