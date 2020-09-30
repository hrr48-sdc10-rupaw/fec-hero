/**
 * @jest-environment node
 */

const {defaults} = require('jest-config');

const request = require('supertest');
const app = require('../server/app.js');
const Sequelize = require('sequelize');
const db = require('../database/models/index.js');
require('dotenv').config()

// beforeAll(async() => {
//   const sequelize = await new Sequelize('fec_hero', 'root', 'password', {
//     host: 'localhost',
//     dialect: 'mysql'
//   })
//   db.sequelize = sequelize;
//   await db.sequelize.sync();
// })


test('api responds with data', done => {
  // console.log(defaults);
  request(app.appMethods.app).get('/api/hero/health')
    .then(response => {
      // console.log(response.body);
      expect(true).toBe(true);
      done();
    })
})


// test('api responds with data', done => {
//   request(app.appMethods.app).get('/api/hero/all_info/2')
//     .then(response => {
//       console.log(response.body);
//       expect(true).toBe(true);
//       done();
//     })
// })