'use strict';
const {Game, GameMedia, GameReview} = require('../models');
const faker = require('faker');
faker.seed(123);

// console.log(Game.prototype);

const getReleaseDate = () => {
  const date = faker.date.between('10-10-2010', '10-10-2020');
  return `${date.getDate()} ${faker.date.month()}, ${date.getFullYear()}`
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
  return faker.image.url();
}
const getMediaArray = (gameId) => {
  const count = 2 + Math.floor(Math.random() * 5);
  const mediaArray = [];
  for (let i = 0; i <= count; i++) {
    mediaArray.push({
      gameId: gameId,
      mediaType: 0,
      mediaUrl: faker.image.unsplash.image()
    })
  }
  return mediaArray;
}
const getReview = (gameId) => {
  const review = {};
  if (gameId % 2 === 0) {
    review.ratingCount = faker.random.number(),
    review.reviewText = faker.company.bsBuzz()
  } else {
    let n1 = faker.random.number();
    let n2 = faker.random.number();
    if (n1 > n2) {
      [n1, n2] = [n2, n1];
    }
    review.ratingCount = `${n1}:${n2}`,
    review.reviewText = faker.fake("{{hacker.adjective}}:{{hacker.adjective}}")
  }
  return review;
}

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
    for (let i = 3; i < 101; i++) {

      let gameInstance = await Game.create({
          gameName: faker.fake('{{hacker.noun}} - {{hacker.adjective}}'),
          publisherId: getPublisherId(),
          developerId: getDeveloperId(),
          description: faker.lorem.paragraph(),
          releaseDate: getReleaseDate()
        });

        let addTags = gameInstance.setTags([1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
          11, 12, 13, 14, 15, 16, 17, 18, 19, 20])

        let review = gameInstance.createGameReview(getReview(i));

        let media = GameMedia.bulkCreate(getMediaArray(i));
      await Promise.all([addTags, review, media]);
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
