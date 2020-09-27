'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gameName: {
        type: Sequelize.STRING,
        field: 'game_name'
      },
      publisherId: {
        type: Sequelize.INTEGER,
        field: 'publisher_id'
      },
      developerId: {
        type: Sequelize.INTEGER,
        field: 'developer_id'
      },
      description: {
        type: Sequelize.TEXT
      },
      releaseDate: {
        type: Sequelize.STRING,
        field: 'release_date'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('games');
  }
};