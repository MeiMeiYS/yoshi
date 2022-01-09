'use strict';
module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    partyId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Parties' }
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    }
  }, {});

  Request.associate = function(models) {
    // associations can be defined here
  };

  Request.getAllRequestsByUserId = async function (userId) {
    return await Request.findAll({
      where: { userId }
    });
  };

  Request.getAllRequestsByPartyId = async function (partyId) {
    return await Request.findAll({
      where: { partyId }
    });
  };

  return Request;
};
