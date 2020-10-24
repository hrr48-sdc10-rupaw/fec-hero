require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const db = require('./db.js');
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

app.get('/', (req, res) => {
  res.send({serverResponse: 'OK'});
})

app.get('/api/hero/all_info/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if(isNaN(id)) {
    console.log(id);
    return res.sendStatus(400);
  }
  const data = await db.get(req.params.id);
  if (data === null) {
    return res.sendStatus(404);
  }
  res.json({
    gameName: data.meta.name,
    releaseDate: 'January 1970',
    gameDescription: data.meta.blurb,
    developerName: data.meta.developer,
    publisherName: data.meta.publisher,
    gameTags: [0, 1, 2, 3, 4],
    gameMedia: data.media.map(m => ({mediaType: 0, mediaUrl: m.url}))
      .concat({mediaType: 2, mediaUrl: data.media[0]}),
    gameReviews: {
      recentReviewCount: '401',
      recentReviews: 'Very Positive',
      allReviewsCount: '22156',
      allReviews: 'Overwhelmingly Positive'
    }
  });
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
const start = async () => {
  const r = await db.connect();
  if(!r) {
    console.error('Could not connect to database.');
    return;
  }
  server = app.listen(port, () => {
    console.log('Server started.');
  })
}

const stop = () => {
  server.close();
};

module.exports.appMethods = {
  start, stop, app
}