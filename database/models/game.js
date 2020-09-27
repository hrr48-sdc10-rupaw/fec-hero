'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Game.belongsTo(models.Publisher);
      Game.belongsTo(models.Developer);
      Game.hasMany(models.GameReview, { foreignKey: 'game_id' });
      Game.hasMany(models.GameMedia, { foreignKey: 'game_id', as: 'GameMedia' });
    }
  };
  Game.init({
    gameName: DataTypes.STRING,
    publisherId: DataTypes.INTEGER,
    developerId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    releaseDate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Game',
    underscored: true,
    timestamps: true,
    tableName: 'games'
  });
  return Game;
};