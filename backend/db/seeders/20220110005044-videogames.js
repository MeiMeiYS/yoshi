'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Videogames', [
      {
        name: 'Overcooked! 2 - PC',
        description: "Overcooked returns with a brand-new helping of chaotic cooking action! Journey back to the Onion Kingdom and assemble your team of chefs in classic couch co-op or online play for up to four players. Hold onto your aprons… it’s time to save the world again!",
        genreId: 2,
        platformId: 1,
        imageId: 6
      },
      {
        name: 'Overcooked! 2 - Switch',
        description: "Overcooked returns with a brand-new helping of chaotic cooking action! Journey back to the Onion Kingdom and assemble your team of chefs in classic couch co-op or online play for up to four players. Hold onto your aprons… it’s time to save the world again!",
        genreId: 2,
        platformId: 6,
        imageId: 6
      },
      {
        name: 'Grand Theft Auto V - PC',
        description: "Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4k and beyond, as well as the chance to experience the game running at 60 frames per second.",
        genreId: 1,
        platformId: 1,
        imageId: 7
      },
      {
        name: 'Grand Theft Auto V - Playstation 3',
        description: "Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4k and beyond, as well as the chance to experience the game running at 60 frames per second.",
        genreId: 1,
        platformId: 5,
        imageId: 7
      },
      {
        name: 'Minecraft Dungeons - PC',
        description: "Fight your way through an exciting action-adventure game, inspired by classic dungeon crawlers and set in the Minecraft universe!",
        genreId: 2,
        platformId: 1,
        imageId: 8
      },
      {
        name: 'Minecraft Dungeons - Xbox',
        description: "Fight your way through an exciting action-adventure game, inspired by classic dungeon crawlers and set in the Minecraft universe!",
        genreId: 2,
        platformId: 2,
        imageId: 8
      },
      {
        name: 'FINAL FANTASY XIV - PC',
        description: "Take part in an epic and ever-changing FINAL FANTASY as you adventure and explore with friends from around the world.",
        genreId: 3,
        platformId: 1,
        imageId: 9
      },
      {
        name: 'FIFA 22 - PC',
        description: "Play FIFA 22, Get a Next Generation Player Item: receive an untradeable Next Generation Player Item in FIFA Ultimate Team starting December 15 when you play FIFA 22 by January 14, 2022*.",
        genreId: 6,
        platformId: 1,
        imageId: 10
      },
      {
        name: 'Phasmophobia - PC',
        description: "Phasmophobia is a 4 player online co-op psychological horror. Paranormal activity is on the rise and it’s up to you and your team to use all the ghost hunting equipment at your disposal in order to gather as much evidence as you can.",
        genreId: 7,
        platformId: 1,
        imageId: 11
      },
      {
        name: 'Tabletop Simulator - PC',
        description: "Tabletop Simulator is the only simulator where you can let your aggression out by flipping the table! There are no rules to follow: just you, a physics sandbox, and your friends. Make your own online board games or play the thousands of community created mods. Unlimited gaming possibilities!",
        genreId: 4,
        platformId: 1,
        imageId: 12
      },
      {
        name: 'Age of Empires II (2013) - PC',
        description: "Age of Empires II has been re-imagined in high definition with new features, trading cards, improved AI, workshop support, multiplayer, Steamworks integration and more!",
        genreId: 5,
        platformId: 1,
        imageId: 13
      },
      {
        name: 'Valheim - PC',
        description: "A brutal exploration and survival game for 1-10 players, set in a procedurally-generated purgatory inspired by viking culture. Battle, build, and conquer your way to a saga worthy of Odin’s patronage!",
        genreId: 8,
        platformId: 1,
        imageId: 14
      },
      {
        name: 'Barotrauma - PC',
        description: "Barotrauma is a 2D co-op submarine simulator – in space, with survival horror elements. Steer your submarine, give orders, fight monsters, fix leaks, operate machinery, man the guns and craft items, and stay alert: danger in Barotrauma doesn’t announce itself!",
        genreId: 5,
        platformId: 1,
        imageId: 15
      },
      {
        name: 'Terraria - PC',
        description: "Dig, fight, explore, build! Nothing is impossible in this action-packed adventure game. Four Pack also available!",
        genreId: 2,
        platformId: 1,
        imageId: 16
      },
      {
        name: 'Left 4 Dead 2 - PC',
        description: "Set in the zombie apocalypse, Left 4 Dead 2 (L4D2) is the highly anticipated sequel to the award-winning Left 4 Dead, the #1 co-op game of 2008. This co-operative action horror FPS takes you and your friends through the cities, swamps and cemeteries of the Deep South, from Savannah to New Orleans across five expansive campaigns...",
        genreId: 1,
        platformId: 1,
        imageId: 17
      },
      {
        name: 'Dota 2 - PC',
        description: "Every day, millions of players worldwide enter battle as one of over a hundred Dota heroes. And no matter if it's their 10th hour of play or 1,000th, there's always something new to discover. With regular updates that ensure a constant evolution of gameplay, features, and heroes, Dota 2 has taken on a life of its own.",
        genreId: 5,
        platformId: 1,
        imageId: 18
      },
      {
        name: 'Fallout 76 - PC',
        description: "Bethesda Game Studios welcome you to Fallout 76. Twenty-five years after the bombs fall, you and your fellow Vault Dwellers emerge into post-nuclear America. Explore a vast wasteland in this open-world multiplayer addition to the Fallout story.",
        genreId: 3,
        platformId: 1,
        imageId: 19
      },
      {
        name: 'The Crew™ 2 - PC',
        description: "Take on the American motorsports scene as you explore and dominate the land, air, and sea across the entire USA. With a wide variety of cars, bikes, boats, and planes, compete in a wide range of driving disciplines.",
        genreId: 6,
        platformId: 1,
        imageId: 20
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Videogames', null, {});
  }
};
