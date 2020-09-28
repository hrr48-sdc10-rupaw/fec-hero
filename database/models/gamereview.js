'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GameReview.belongsTo(models.Game);
    }
  };
  GameReview.init({
    gameId: DataTypes.INTEGER,
    ratingCount: DataTypes.STRING,
    reviewText: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GameReview',
    underscored: true,
    timestamps: true,
    tableName: 'game_reviews'
  });
  return GameReview;
};