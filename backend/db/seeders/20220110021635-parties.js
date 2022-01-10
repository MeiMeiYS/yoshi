'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Parties', [
      {
        id: 1,
        name: 'Demo-Racing-Party',
        description: "Demo-Racing-Party is an adult clan (21+) focused on racing. All time zones are welcome; however, our peak hours are 4pm to 2am CST. If there is a challenge, we will get it done. Please be polite or you will get kicked out.",
        space: 10,
        openStatus: true,
        gameId: 18,
        ownerId: 3,
        imageId: 21
      },
      {
        id: 2,
        name: 'Team SKYNITE Valheim',
        description: "This is the Heart and Soul of tSn. tSn was founded and based in NWA, Arkansas with many divisions/sub-teams throughout the Region. (Texas and Oklahoma) The Arkansas Gaming Team is the main branch of tSn and we run a competitive team alongside it also. This is our Valheim group. If you're interest in our Valheim family, please check out our Discord for rules. We play every weekend!",
        space: 20,
        openStatus: true,
        gameId: 12,
        ownerId: 2,
        imageId: 22
      },
      {
        id: 3,
        name: 'No1 Chef',
        description: "Looking for ppl to play this game with.",
        space: 5,
        openStatus: true,
        gameId: 2,
        ownerId: 1,
        imageId: 23,
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Parties', null, {});
  }
};
