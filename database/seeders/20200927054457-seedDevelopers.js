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
    await queryInterface.bulkInsert('developers', [
      { developer_name: 'Scarab Entertainment', created_at: new Date(), updated_at: new Date()},
      { developer_name: 'id Software', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Activision', created_at: new Date(), updated_at: new Date()},
      { developer_name: '2K Sports', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'EA Sports', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Bandai Namco', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Bethesda Game Studios', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Big Fish Games', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Blizzard Entertainment', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Capcom', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Codemasters', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Creative Assembly', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Crytek', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Dhruva Interactive', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Electronic Arts', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Epic Games', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Gameloft', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Humongous Entertainment', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Konami', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Lucas Arts', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Nintendo', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Origin Systems', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Rockstar Games', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Sega', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'THQ', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Ubisoft', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Valve', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Warner Bros. Interactive Entertainment', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'XBOX Game Studios', created_at: new Date(), updated_at: new Date() },
      { developer_name: 'Zynga', created_at: new Date(), updated_at: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('developers', null, {});
  }
};
