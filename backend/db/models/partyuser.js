'use strict';
module.exports = (sequelize, DataTypes) => {
  const PartyUser = sequelize.define('PartyUser', {
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

  PartyUser.associate = function(models) {
    // associations can be defined here
  };

  PartyUser.getAllPartiesByUserId = async function (userId) {
    return await PartyUser.findAll({
      where: { userId }
    });
  };

  PartyUser.getAllUsersByPartyId = async function (partyId) {
    return await PartyUser.findAll({
      where: { partyId }
    });
  };

  return PartyUser;
};
