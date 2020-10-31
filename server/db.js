const pg = require('pg');
const config = require('./config.js');

const meta_query = `SELECT * FROM games WHERE id = $1;`;
const media_query = `SELECT * FROM media WHERE gid = $1`;
const insert_meta = `
INSERT INTO games (name, blurb, publisher, developer)
VALUES ($1, $2, $3, $4);
`;
const insert_img = `
INSERT INTO media (gid, url)
VALUES ($1, $2);
`;

let client;
const connect = async function() {
  client = new pg.Client(config);
  return client.connect().then(_ => 1).catch(why => {console.log(why); return 0});
};

const get = function(id) {
  const mtp = client.query(meta_query, [id]);
  const mep = client.query(media_query, [id]);
  return Promise.all([mtp, mep])
    .then(([meta, media]) => ({meta: meta.rows[0], media: media.rows}))
    .catch(_ => null);
};

const remove = function(id) {
  return client.query('DELETE FROM games WHERE id = $1 CASCADE', [id])
    .then(_ => 1)
    .catch(_ => 0);
};

const validp = function(game, media) {
  const vm = m => typeof(m.mediaUrl) === 'string' && typeof(m.mediaType) === 'number';
  return typeof(game.gameName) === 'string'
  && typeof(game.releaseDate) === 'string'
  && typeof(game.description) === 'string'
  && typeof(game.developer) === 'string'
  && typeof(game.publisher) === 'string'
  && media.every(vm);
};

const insert = function(props) {
  if (!validp(props.info, props.media)) {
    return 0;
  }
  return client.query(insert_meta, [
    props.info.name,
    props.info.description,
    props.info.publisher,
    props.info.developer,
    0b0101010111010,
  ]).then(x => Promise.all(props.media.slides.map(e => client.query(insert_img, [x.rows[0], e]))))
  .then(_ => 1)
  .catch(_ => 0);
};

module.exports = {
  connect,
  get,
  remove,
  insert
};