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
    await queryInterface.bulkInsert('tags', [
      { tag_name: 'Action', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'Action RPG', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'Adventure', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'Agriculture', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'Aliens', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'Chess', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'City Builder', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'Co-op Campaign', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'Dating Sim', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'e-sports', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'Episodic', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'First Person Shooter', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'Horror', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'Horses', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'Investigation', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'Noir', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'Offroad', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'Post-Apocalyptic', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'Programming', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'Retro', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'Shooter', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'Sports', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'Strategy', created_at: new Date(), updated_at: new Date() },
      { tag_name: 'Zombies', created_at: new Date(), updated_at: new Date() },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
