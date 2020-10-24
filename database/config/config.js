require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME || "root",
    "password": process.env.DB_PASSWORD || "root",
    "database": process.env.DB_NAME_DEV || "fec_hero",
    "host": process.env.DB_HOST_DEV || "127.0.0.1",
    "dialect": process.env.DB_DIALECT_DEV || "mysql",
    "seederStorage": "sequelize"
  },
  "test": {
    "username": process.env.DB_USERNAME || "root",
    "password": process.env.DB_PASSWORD || "root",
    "database": process.env.DB_NAME_DEV || "fec_hero",
    "host": process.env.DB_HOST_DEV || "127.0.0.1",
    "dialect": process.env.DB_DIALECT_DEV || "mysql",
    "seederStorage": "sequelize"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
