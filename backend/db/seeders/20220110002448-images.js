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
      {url: 'https://i.ibb.co/FxGqwLN/1-overcook.jpg'},
      {url: 'https://res.cloudinary.com/dokjfrn66/image/upload/v1642014499/2-gta_rnrlou.jpg'},
      {url: 'https://res.cloudinary.com/dokjfrn66/image/upload/v1642014500/3-minecraft_bd62n4.jpg'},
      {url: 'https://res.cloudinary.com/dokjfrn66/image/upload/v1642014499/4-ff_so0r9t.jpg'},
      {url: 'https://res.cloudinary.com/dokjfrn66/image/upload/v1642014615/header_ia9d6f.jpg'},
      {url: 'https://res.cloudinary.com/dokjfrn66/image/upload/v1642014671/header_ssgirt.jpg'},
      {url: 'https://res.cloudinary.com/dokjfrn66/image/upload/v1642014683/header_paoqfq.jpg'},
      {url: 'https://res.cloudinary.com/dokjfrn66/image/upload/v1642015030/header_d3j0rr.jpg'},
      {url: 'https://res.cloudinary.com/dokjfrn66/image/upload/v1642015047/header_m9huwy.jpg'},
      {url: 'https://res.cloudinary.com/dokjfrn66/image/upload/v1642015066/header_vsfebv.jpg'},
      {url: 'https://res.cloudinary.com/dokjfrn66/image/upload/v1642015127/header_grudvr.jpg'},
      {url: 'https://res.cloudinary.com/dokjfrn66/image/upload/v1642015140/header_e4shcp.jpg'},
      {url: 'https://res.cloudinary.com/dokjfrn66/image/upload/v1642015188/header_lmnd28.jpg'},
      {url: 'https://res.cloudinary.com/dokjfrn66/image/upload/v1642015204/header_kpf4qh.jpg'},
      {url: 'https://res.cloudinary.com/dokjfrn66/image/upload/v1642015219/header_lz4pfw.jpg'},
      //vvv party images
      {url: 'https://image.freepik.com/free-vector/super-car-illustration_74218-152.jpg'},
      {url: 'https://images.unsplash.com/photo-1595429035839-c99c298ffdde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'},
      {url: 'https://image.freepik.com/free-vector/coloured-chefdesign_1152-73.jpg'},
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
