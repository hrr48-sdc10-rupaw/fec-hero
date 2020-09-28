'use strict';

const {Game, Tag} = require('./index.js');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  GameTag.init({
    gameId: {
      type: DataTypes.INTEGER,
      references: {
        model: Game,
        key: 'id'
      }
    },
    tagId: {
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'GameTag',
    underscored: true,
    timestamps: true,
    tableName: 'game_tags'
  });
  return GameTag;
};