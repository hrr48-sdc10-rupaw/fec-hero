'use strict';

const {Game, GameMedia, GameReview, GameTag} = require('../models')

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
    let gameInstance = await Game.create({
        gameName: 'Hello Kitty and Sanrio Friends Racing',
        publisherId: 1,
        developerId: 1,
        description: 'Come and join Hello Kitty with her best friends in this action-packed Family Racing Party never before available on Steam!',
        releaseDate: '10 Jul, 2015'
      });

      let addTags = gameInstance.setTags([1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

      let review = gameInstance.createGameReview({
        ratingCount: '18',
        reviewText: 'Mixed'
      });

      let media = GameMedia.bulkCreate([
        {
          gameId: 1,
          mediaType: 0,
          mediaUrl: 'https://hack-reactor-projects.s3-us-west-1.amazonaws.com/fec/0/images/0.jpg'
        },
        {
          gameId: 1,
          mediaType: 0,
          mediaUrl: 'https://hack-reactor-projects.s3-us-west-1.amazonaws.com/fec/0/images/1.jpg'
        },
        {
          gameId: 1,
          mediaType: 0,
          mediaUrl: 'https://hack-reactor-projects.s3-us-west-1.amazonaws.com/fec/0/images/2.jpg'
        },
        {
          gameId: 1,
          mediaType: 0,
          mediaUrl: 'https://hack-reactor-projects.s3-us-west-1.amazonaws.com/fec/0/images/3.jpg'
        },
        {
          gameId: 1,
          mediaType: 0,
          mediaUrl: 'https://hack-reactor-projects.s3-us-west-1.amazonaws.com/fec/0/images/4.jpg'
        },
        {
          gameId: 1,
          mediaType: 0,
          mediaUrl: 'https://hack-reactor-projects.s3-us-west-1.amazonaws.com/fec/0/images/5.jpg'
        },
        {
          gameId: 1,
          mediaType: 0,
          mediaUrl: 'https://hack-reactor-projects.s3-us-west-1.amazonaws.com/fec/0/images/6.jpg'
        },
        {
          gameId: 1,
          mediaType: 0,
          mediaUrl: 'https://hack-reactor-projects.s3-us-west-1.amazonaws.com/fec/0/images/7.jpg'
        },
        {
          gameId: 1,
          mediaType: 1,
          mediaUrl: 'https://steamcdn-a.akamaihd.net/steam/apps/2040599/movie480.webm?t=1447376981'
        },
        {
          gameId: 1,
          mediaType: 1,
          mediaUrl: 'https://steamcdn-a.akamaihd.net/steam/apps/2040600/movie480.webm?t=1447376982'
        },
        {
          gameId: 1,
          mediaType: 2,
          mediaUrl: 'https://hack-reactor-projects.s3-us-west-1.amazonaws.com/fec/0/images/bg.jpg'
        }
      ]);

    await Promise.all([addTags, review, media]);
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
