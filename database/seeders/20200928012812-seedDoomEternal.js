'use strict';

const {Game, GameMedia, GameReview, GameTag} = require('../models')

console.log(Game.prototype);
// console.log(GameTag.prototype);

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
        gameName: 'Doom ETERNAL',
        publisherId: 2,
        developerId: 2,
        description: 'Hell’s armies have invaded Earth. Become the Slayer in an epic single-player campaign to conquer demons across dimensions and stop the final destruction of humanity. The only thing they fear... is you.',
        releaseDate: '20 March, 2020'
      });

      let addTags = gameInstance.setTags([1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20])

      let review = gameInstance.createGameReview({
        ratingCount: '2086:66782',
        reviewText: 'Very Positive:Very Positive'
      });

      let media = GameMedia.bulkCreate([
        {
          gameId: 2,
          mediaType: 0,
          mediaUrl: 'https://hack-reactor-projects.s3-us-west-1.amazonaws.com/fec/1/images/0.jpg'
        },
        {
          gameId: 2,
          mediaType: 0,
          mediaUrl: 'https://hack-reactor-projects.s3-us-west-1.amazonaws.com/fec/1/images/1.jpg'
        },
        {
          gameId: 2,
          mediaType: 0,
          mediaUrl: 'https://hack-reactor-projects.s3-us-west-1.amazonaws.com/fec/1/images/2.jpg'
        },
        {
          gameId: 2,
          mediaType: 0,
          mediaUrl: 'https://hack-reactor-projects.s3-us-west-1.amazonaws.com/fec/1/images/3.jpg'
        },
        {
          gameId: 2,
          mediaType: 0,
          mediaUrl: 'https://hack-reactor-projects.s3-us-west-1.amazonaws.com/fec/1/images/4.jpg'
        },
        {
          gameId: 2,
          mediaType: 0,
          mediaUrl: 'https://hack-reactor-projects.s3-us-west-1.amazonaws.com/fec/1/images/5.jpg'
        },
        {
          gameId: 2,
          mediaType: 0,
          mediaUrl: 'https://hack-reactor-projects.s3-us-west-1.amazonaws.com/fec/1/images/6.jpg'
        },
        {
          gameId: 2,
          mediaType: 0,
          mediaUrl: 'https://hack-reactor-projects.s3-us-west-1.amazonaws.com/fec/1/images/7.jpg'
        },
        {
          gameId: 2,
          mediaType: 0,
          mediaUrl: 'https://hack-reactor-projects.s3-us-west-1.amazonaws.com/fec/1/images/8.jpg'
        },
        {
          gameId: 2,
          mediaType: 0,
          mediaUrl: 'https://hack-reactor-projects.s3-us-west-1.amazonaws.com/fec/1/images/9.jpg'
        },
        {
          gameId: 2,
          mediaType: 1,
          mediaUrl: 'https://steamcdn-a.akamaihd.net/steam/apps/256778598/movie480_vp9.webm?t=1586386363'
        }
      ])

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
