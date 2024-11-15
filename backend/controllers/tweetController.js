// controllers/tweetController.js

const { Tweet, User, UserTweetShare } = require("../models");
const { sendEmail } = require("../services/emailService");

exports.createTweet = async (req, res) => {
  try {
    const tweet = await Tweet.create({
      content: req.body.content,
      userId: req.user.id,
    });
    res.status(201).json({ message: "Tweet created", tweet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating tweet", error });
  }
};

exports.getTweets = async (req, res) => {
  try {
    // Get pagination parameters from query string with defaults
    const page = parseInt(req.query.page) || 1; // Default to 1 if no page is provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default to 10 tweets per page if no pageSize is provided
    const offset = (page - 1) * pageSize; // Calculate the offset

    // // Fetch own tweets with pagination
    // const ownTweets = await Tweet.findAll({
    //   where: { userId: req.user.id },
    // });
    // // Fetch shared tweets with pagination
    // const sharedTweets = await Tweet.findAll({
    //   include: {
    //     model: User,
    //     as: "sharedWith",
    //     where: { id: req.user.id },
    //   },
    // });

    const ownTweets = await Tweet.findAll({ where: { userId: req.user.id } });
    const sharedTweets = await Tweet.findAll({
      include: {
        model: User,
        as: "sharedWith",
        where: { id: req.user.id },
      },
    });
    res.json({ ownTweets, sharedTweets });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tweets", error });
  }
};

exports.shareTweet = async (req, res) => {
  try {
    const { tweetId, sharedWithUserIds } = req.body;
    const tweet = await Tweet.findByPk(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    const shares = sharedWithUserIds.map((userId) => ({
      tweetId,
      sharedWithUserId: userId,
    }));
    await UserTweetShare.bulkCreate(shares);

    // Simulate email sending
    const sharedUsers = await User.findAll({
      where: { id: sharedWithUserIds },
    });
    sharedUsers.forEach((user) => {
      sendEmail(user.email, tweet.content);
    });

    res.json({ message: "Tweet shared with selected users" });
  } catch (error) {
    res.status(500).json({ message: "Error sharing tweet", error });
  }
};
