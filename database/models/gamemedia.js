'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameMedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GameMedia.belongsTo(models.Game);
    }
  };
  GameMedia.init({
    gameId: DataTypes.INTEGER,
    mediaType: DataTypes.INTEGER,
    mediaUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GameMedia',
    underscored: true,
    timestamps: true,
    freezeTableName: true,
    tableName: 'game_media'
  });
  return GameMedia;
};