"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserTweetShare extends Model {
    static associate(models) {
      UserTweetShare.belongsTo(models.Tweet, { foreignKey: "tweetId" });
      UserTweetShare.belongsTo(models.User, { foreignKey: "sharedWithUserId" });
    }
  }
  UserTweetShare.init(
    {
      tweetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sharedWithUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserTweetShare",
    }
  );
  return UserTweetShare;
};
