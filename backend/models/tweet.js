"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Tweet extends Model {
    static associate(models) {
      Tweet.belongsTo(models.User, { foreignKey: "userId", as: "author" });
      Tweet.belongsToMany(models.User, {
        through: models.UserTweetShare,
        foreignKey: "tweetId",
        as: "sharedWith",
      });
    }
  }
  Tweet.init(
    {
      content: {
        type: DataTypes.STRING(280),
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Tweet",
    }
  );
  return Tweet;
};
