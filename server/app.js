require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const db = require('./db.js');
const port = process.env.PORT || 3001;

// console.log(Game.prototype);
app = express();
app.use(logger('dev'));
app.use('/', express.static(path.join(__dirname, '../dist')))
app.use(express.json());

app.get('/', (req, res) => {
  res.send({serverResponse: 'OK'});
})

const flags = [
  'Action', 'Adventure', 'RPG', 'Sandbox', 'FPS', 'Hero Shooter',
  'Crafting', 'Horror', 'Anime', 'Idle', 'RTS', 'MMORPG', 'Stealth',
  'Hunting', 'Horror', 'Indie', 'Soundtrack', 'Marketplace',
  'Simulator', 'Farming', 'Politics', 'AR', 'VR', 'Story',
  'Atmospheric', 'Space', 'Melee', 'Fantasy', 'Turn-based',
  'Economy', 'Remaster', 'Survival', 'Puzzle'
];

const maketags = function(bits) {
  const tags = [];
  const push = (b, name) => (bits & b) && tags.push(name);
  flags.forEach((fl, i) => push(1 << i, fl));
  return tags;
};

app.get('/api/hero/all_info/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if(isNaN(id)) {
    return res.sendStatus(400);
  }
  const data = await db.get(req.params.id);
  if (data === null) {
    return res.sendStatus(404);
  }
  console.log(data.meta);
  res.json({
    gameName: data.meta.name,
    releaseDate: 'January 1970',
    gameDescription: data.meta.blurb,
    developerName: data.meta.developer,
    publisherName: data.meta.publisher,
    gameTags: maketags(data.meta.tags),
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
app.post('/api/hero/all_info/', async function(req, res) {
  const id = parseInt(req.params.id);
  if(isNaN(id)) {
    return res.sendStatus(400);
  }
  const r = db.insert(req.body);
  res.sendStatus(r ? 500 : 200);
});

app.delete('/api/hero/all_info/:id', async function(req, res) {
  const id = parseInt(req.params.id);
  if(isNaN(id)) {
    return res.sendStatus(400);
  }
  const err = db.remove(id);
  res.sendStatus(err ? 500 : 200);
});

app.put('/api/hero/all_info/:id', async function(req, res) {
  const id = parseInt(req.params.id);
  if(isNaN(id)) {
    return res.sendStatus(400);
  }
  const r = db.insert(req.body);
  res.sendStatus(r ? 500 : 200);
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