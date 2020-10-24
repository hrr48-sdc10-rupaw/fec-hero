const pg = require('pg');
const config = require('./config.js');

const meta_query = `SELECT * FROM games WHERE id = $1;`;
const media_query = `SELECT * FROM media WHERE gid = $1`;

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

const erase = function(id) {

};

module.exports = {
  connect,
  get,
};