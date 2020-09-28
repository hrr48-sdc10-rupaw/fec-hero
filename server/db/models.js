require('dotenv').config();
const { Sequelize } = require('sequelize');
console.log(process.env.DB_USERNAME);
const DB_NAME = 'fec-hero-widget';

const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  dialect: 'mysql'
})

const queryInterface = sequelize.getQueryInterface();

queryInterface.createDatabase(DB_NAME)
  .then(result => {
    console.log('db created');
  })
  .catch(err => {
    console.log('error while creating the database: ', err);
  })

