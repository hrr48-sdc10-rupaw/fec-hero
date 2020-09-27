require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const {
  Game,
  Tag,
  Developer,
  Publisher,
  GameReview,
  GameMedia
} = require('../database/models');

// console.log(Game.prototype);

app = express();

app.get('/health', (req, res) => {
  res.send('OK');
})


Game.create({
  gameName: 'DOOM Eternal',
  description: 'Possibly the best FPS of ALL TIME!!',
  releaseDate: '30 March, 2020'
}).then(gameInstance => {
  gameInstance.createDeveloper({
    developerName: 'id Software'
  });
  return gameInstance;
})
  .then(gameInstance => {
    gameInstance.createPublisher({
      publisherName: 'Bethesda Softworx'
    })
    return gameInstance;
  })
  .then(gameInstance => {
    gameInstance.createGameReview({
      rating: 5,
      reviewText: 'I can not believe how much fun I am having playing this thing!'
    });
    return gameInstance;
  })
  .then(gameInstance => {
    gameInstance.createGameMedium({
          mediaType: 0,
          mediaUrl: 'http://s3.asia-pacific.com/bucketName'
    });
    return gameInstance;
  })
  .then(() => {
    console.log('data entry created');
    app.listen(port, () => console.log(`server running at ${port}`));
  })
  .catch(err => console.log('following error occured: ', err));