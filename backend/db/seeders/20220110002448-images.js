'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      //vvv first five images are for demo users
      {url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'},
      {url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
      {url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
      {url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
      {url: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'},
      //vvv game images
      {url: 'https://cdn.akamai.steamstatic.com/steam/apps/728880/header.jpg?t=1636724470'},
      {url: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg?t=1618856444'},
      {url: 'https://cdn.akamai.steamstatic.com/steam/apps/1672970/header.jpg?t=1632517447'},
      {url: 'https://cdn.akamai.steamstatic.com/steam/apps/39210/header.jpg?t=1639672153'},
      {url: 'https://cdn.akamai.steamstatic.com/steam/apps/1506830/header.jpg?t=1639481807'},
      {url: 'https://cdn.akamai.steamstatic.com/steam/apps/739630/header.jpg?t=1638041534'},
      {url: 'https://cdn.akamai.steamstatic.com/steam/apps/286160/header.jpg?t=1620412025'},
      {url: 'https://cdn.akamai.steamstatic.com/steam/apps/221380/header.jpg?t=1620144521'},
      {url: 'https://cdn.akamai.steamstatic.com/steam/apps/892970/header.jpg?t=1640164980'},
      {url: 'https://cdn.akamai.steamstatic.com/steam/apps/602960/header.jpg?t=1637078428'},
      {url: 'https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg?t=1590092560'},
      {url: 'https://cdn.akamai.steamstatic.com/steam/apps/550/header.jpg?t=1630686839'},
      {url: 'https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg?t=1639608963'},
      {url: 'https://cdn.akamai.steamstatic.com/steam/apps/1151340/header.jpg?t=1639075187'},
      {url: 'https://cdn.akamai.steamstatic.com/steam/apps/646910/header.jpg?t=1637080080'},
      //vvv party images
      {url: 'https://image.freepik.com/free-vector/super-car-illustration_74218-152.jpg'},
      {url: 'https://teamskynite.files.wordpress.com/2014/06/8188997_medium.jpg'},
      {url: 'https://image.freepik.com/free-vector/coloured-chefdesign_1152-73.jpg'},
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
