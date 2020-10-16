require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const port = process.env.PORT || 3001;
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
app.use(express.json());

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
  if (!gameInstance) {
    return res.sendStatus(404);
  }
  // console.log(gameInstance[0].__proto__);
  let publisher = gameInstance.getPublisher();
  let developer = gameInstance.getDeveloper();
  let tags = gameInstance.getTags();
  let reviews = gameInstance.getGameReviews();
  let media = gameInstance.getGameMedia();

  [publisher, developer, tags, reviews, media] = await Promise.all([publisher, developer, tags, reviews, media]);

  const formatReviews = () => {
    if (reviews[0].reviewText.includes(':')) {
      let reviewText = reviews[0].reviewText.split(':');
      let reviewCount = reviews[0].ratingCount.split(':');
      return {
        recentReviews: reviewText[0],
        recentReviewCount: reviewCount[0],
        allReviews: reviewText[1],
        allReviewsCount: reviewCount[1]
      };
    } else {
      return {
        allReviews: reviews[0].reviewText,
        allReviewCount: reviews[0].ratingCount
      }
    }
  }

  const responseInfo = {
    gameName: gameInstance.gameName,
    releaseDate: gameInstance.releaseDate,
    gameDescription: gameInstance.description,
    developerName: developer.developerName,
    publisherName: publisher.publisherName,
    gameTags: tags.map(obj => obj.tagName),
    gameReviews: formatReviews(),
    gameMedia: media.map(obj => {
      return {
        mediaType: obj.mediaType,
        mediaUrl: obj.mediaUrl
      }
    })
  };
  res.status(200);
  res.json(responseInfo);
});

//SDC CRUD
const validp = function(game) {
  return game.gameName && typeof(game.gameName) === 'string'
  && game.releaseDate && typeof(game.releaseDate) === 'string'
  && game.description && typeof(game.description) === 'string'
  && game.developerId !== undefined && typeof(game.developerId) === 'number'
  && game.publisherId !== undefined && typeof(game.publisherId) === 'number';
};

app.post('/api/hero/all_info/', async function(req, res) {
  if (!validp(req.body.info)) {
    return res.sendStatus(400);
  }
  let game = await Game.create(req.body.info);
  if (!game) {
    console.log("Create failed");
    return res.sendStatus(500);
  }
  let x = game.setTags([]);
  let y = game.createGameReview({
    ratingCount: '0:0',
    reviewText: 'Mixed:Mixed'
  });
  let z = GameMedia.create({
    gameId: game.id,
    mediaType: 2,
    mediaUrl: req.body.media.bg
  })
  let w = GameMedia.bulkCreate(req.body.media.slides.map(g => {
    g.gameId = game.id;
    return g;
  }));
  Promise.all([x, y, z, w])
    .then(res.send(`${game.id}`))
    .catch(why => {
      console.log(why);
      res.sendStatus(500);
    });
});

app.delete('/api/hero/all_info/:id', async function(req, res) {
  let x = Game.destroy({where: {id: req.params.id}});
  let y = GameReview.destroy({where: {gameId: req.params.id}});
  let z = GameMedia.destroy({where: {gameId: req.params.id}});
  Promise.all([x, y, z]).then(()=> res.sendStatus(200));
});

app.put('/api/hero/all_info/:id', async function(req, res) {
  let g = await Game.findOne({where: {id: req.params.id}});
  if(!g) {
    return res.sendStatus(404);
  }
  let u1 = Game.update(req.body.info, {where: {id: req.params.id}});
  let u2;
  if (req.body.media && req.body.media.slides) {
    const imgs = req.body.media.slides;
    if (req.body.media.slides) {
      imgs.push({mediaUrl: req.body.media.bg, mediaType: 2});
    }
    u2 = GameMedia.update(imgs, {where: {gameId: req.params.id}});
  } else {
    u2 = Promise.resolve();
  }

  Promise.all([u1, u2])
    .then(()=> res.sendStatus(200))
    .catch(why => {
      console.log(why);
      res.sendStatus(500);
    });
});


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