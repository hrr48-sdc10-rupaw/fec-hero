'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('publishers', [
      { publisher_name: 'Scarab Entertainment', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'Bethesda Softworks', created_at: new Date(), updated_at: new Date() },
      { publisher_name: '2K Games', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'Activision Blizzard', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'Alpha Dream', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'American Video Entertainment', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'Atari, Inc', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'BBC Multimedia', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'Black Bean Games', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'Capcom', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'Compile', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'Davilex Games', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'Double Fine', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'Electronic Arts', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'Epic Games', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'Feral Interactive', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'Full On Games', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'Gameloft', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'Gearbox Software', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'Hope Lab', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'Humble Bundle', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'Incredible Technologies', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'Jester Interactive', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'Legacy Interactive', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'Level-5', created_at: new Date(), updated_at: new Date() },
      { publisher_name: 'MacPlay', created_at: new Date(), updated_at: new Date()},
      { publisher_name: 'Microsoft', created_at: new Date(), updated_at: new Date()},
      { publisher_name: 'Nintendo', created_at: new Date(), updated_at: new Date()},
      { publisher_name: 'Oculus Studios', created_at: new Date(), updated_at: new Date()},
      { publisher_name: 'Phantagram', created_at: new Date(), updated_at: new Date()},
      { publisher_name: 'Prototype', created_at: new Date(), updated_at: new Date()},
      { publisher_name: 'Raw Fury', created_at: new Date(), updated_at: new Date()},
      { publisher_name: 'Riot Games', created_at: new Date(), updated_at: new Date()},
      { publisher_name: 'Sony Interactive Entertainment', created_at: new Date(), updated_at: new Date()},
      { publisher_name: 'Tencent', created_at: new Date(), updated_at: new Date()},
      { publisher_name: 'Ubisoft', created_at: new Date(), updated_at: new Date()},

    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('publishers', null, {});
  }
};
