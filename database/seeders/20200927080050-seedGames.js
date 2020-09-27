'use strict';
const {Game, GameMedia, GameReview} = require('../models');
const faker = require('faker');

console.log(Game.prototype);

const getRating = () => {
  return Math.floor(Math.random() * 6);
};
const getReview = () => {
  return faker.lorem.sentence();
}
const getDeveloperId = () => {
  // max id present in developers table = 29, by seed script
  return Math.floor(Math.random() * 30);
}
const getPublisherId = () => {
  // max id present in publishers table = 35, by seed script
  return Math.floor(Math.random() * 36);
}
const getMediaType = () => {
  // media type should be either 0 for picture, or 1 for video
  return Math.floor(Math.random() * 2);
}
const getMediaUrl = () => {
  return faker.internet.url();
}
const getGameName = () => {
  const names = ['Doom', 'Hello Kitty', 'Crysis', 'Control', 'Doom Eternal'];
  let index = Math.floor(Math.random() * names.length);
  return names[index];
}

module.exports = {
  up: async () => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    for (let i = 0; i < 2; i++) {
      let gameInstance = await Game.create({
        gameName: getGameName(),
        getPublisherId: getPublisherId(),
        developerId: getDeveloperId(),
        description: getReview(),
        releaseDate: 'Sep 1, 2020',});

      let review = await gameInstance.createGameReview({
        rating: getRating(),
        reviewText: getReview()
      });

      let
    }
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
