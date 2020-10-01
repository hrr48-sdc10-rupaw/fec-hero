require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const port = process.env.PORT || 3000;
const {
  Game,
  Tag,
  Developer,
  Publisher,
  GameReview,
  GameMedia,
  GameTag
} = require('../database/models');

// console.log(Game.prototype);
app = express();
app.use(logger('dev'));
app.use('/', express.static(path.join(__dirname, '../dist')))

app.get('/api/hero/health', (req, res) => {
  res.json({serverResponse: 'OK'});
})

app.get('/', (req, res) => {
  res.send({serverResponse: 'OK'});
})

app.get('/api/hero/all_info/:id', async (req, res) => {
  // console.log('GET /api/hero/all_info/:id');
  const id = req.params.id;
  console.log('sending all the info for id: ', id);
  let gameInstance;
  try {
    gameInstance = await Game.findOne({
      where: {
        id: id
      }
    });
  } catch (err) {
    console.log('following error occured: ', err);
    res.status(404);
    res.send({serverResponse: 'Not Found'});
    return;
  }

  // console.log(gameInstance[0].__proto__);
  let publisher = gameInstance.getPublisher();
  let developer = gameInstance.getDeveloper();
  let tags = gameInstance.getTags();
  let reviews = gameInstance.getGameReviews();
  let media = gameInstance.getGameMedia();

  [publisher, developer, tags, reviews, media] = await Promise.all([publisher, developer, tags, reviews, media]);

  const responseInfo = {
    gameName: gameInstance.gameName,
    developerName: developer.developerName,
    publisherName: publisher.publisherName,
    gameTags: tags.map(obj => obj.tagName),
    gameReviews: {
      review: reviews[0].reviewText,
      ratingCount: reviews[0].ratingCount
    },
    gameMedia: media.map(obj => {
      return {
        mediaType: obj.mediaType,
        mediaUrl: obj.mediaUrl
      }
    })
  };
  res.status(200);
  res.json(responseInfo);
})

let server;
const start = () => {
  server = app.listen(port, () => {
    console.log('\n||||||||||||||||||||||||||||||||||||||||||||||||||||')
    console.log(`\nMoist-Air hero section service running at port: ${port}`);
    console.log('\n||||||||||||||||||||||||||||||||||||||||||||||||||||\n')
  })
}

const stop = () => {
  server.close()
};

module.exports.appMethods = {
  start, stop, app
}