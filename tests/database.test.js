require('dotenv').config();
const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_DEV
});

afterAll(done => {
  conn.end();
  done();
});

test('sanity test', () => {
  expect(true).toBe(true);
});

test('games table is seeded', done => {
  function callback(error, result) {
    if (error) {
      console.log('--> following error: ', error)
      done(error);
    }
    expect(result[0]['count(*)']).toBeGreaterThan(99);
    done()
  }
  conn.query('select count(*) from games', callback);
});

test('game_reviews table is seeded', done => {
  function callback(error, result) {
    if (error) {
      console.log('Error: ', error);
      done(error);
    }
    expect(result[0]['count(*)']).toBeGreaterThan(99);
    done();
  }
  conn.query('select count(*) from game_reviews', callback);
});

test('developers table is seeded', done => {
  function callback(error, result) {
    if (error) {
      console.log('Error: ', error);
      done(error);
    }
    expect(result[0]['count(*)']).toBeGreaterThan(10);
    done();
  }
  conn.query('select count(*) from developers', callback)
});

test('publishers table is seeded', done => {
  function callback(error, result) {
    if (error) {
      console.log('--> following error: ', error)
      done(error);
    }
    expect(result[0]['count(*)']).toBeGreaterThan(10);
    done()
  }
  conn.query('select count(*) from publishers', callback);
});

test('game_media table is seeded', done => {
  function callback(error, result) {
    if (error) {
      console.log('--> following error: ', error)
      done(error);
    }
    expect(result[0]['count(*)']).toBeGreaterThan(99);
    done()
  }
  conn.query('select count(*) from game_media', callback);
});

test('tags table is seeded', done => {
  function callback(error, result) {
    if (error) {
      console.log('--> following error: ', error)
      done(error);
    }
    expect(result[0]['count(*)']).toBeGreaterThan(10);
    done()
  }
  conn.query('select count(*) from tags', callback);
});

test('game_tags table is seeded', done => {
  function callback(error, result) {
    if (error) {
      console.log('--> following error: ', error)
      done(error);
    }
    expect(result[0]['count(*)']).toBeGreaterThan(99);
    done()
  }
  conn.query('select count(*) from game_tags', callback);
})

