'use strict';
module.exports = (sequelize, DataTypes) => {
  const PartyChat = sequelize.define('PartyChat', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
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

  PartyChat.associate = function(models) {
    // associations can be defined here
    PartyChat.belongsTo(models.Party, {foreignKey: 'partyId'});
    PartyChat.belongsTo(models.User, {foreignKey: 'userId'});
  };

  PartyChat.getAllChatByUserId = async function (userId) {
    return await PartyChat.findAll({
      where: { userId }
    });
  };

  PartyChat.getAllChatByPartyId = async function (partyId) {
    return await PartyChat.findAll({
      where: { partyId }
    });
  };

  return PartyChat;
};
