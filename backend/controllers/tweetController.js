// controllers/tweetController.js

const { Tweet, User, UserTweetShare } = require("../models");
const { sendEmail } = require("../services/emailService");

exports.createTweet = async (req, res) => {
  console.log(req.body);
  try {
    const tweet = await Tweet.create({
      content: req.body.content,
      userId: req.user.id,
    });

    // Extract user IDs from the tags array and share
    const tagUserIds = req.body.tags
      .map((tag) => tag.id) // Get all user IDs from tags
      .filter((userId) => userId !== req.user.id); // Remove the tweet creator's user ID
    if (tagUserIds.length > 0) {
      // console.log(tagUserIds); //Log the userId for Dev
      await shareTweetWithUsers(tweet.id, tagUserIds); // Share the tweet with tagged users
    }

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
    // Combine both own and shared tweets
    const combinedTweets = [...ownTweets, ...sharedTweets];

    // Calculate total count and pagination info
    const totalTweets = combinedTweets.length;
    const totalPages = Math.ceil(totalTweets / pageSize);

    // Sort the combined tweets based on createdAt (primary) and updatedAt (secondary)
    combinedTweets.sort((a, b) => {
      const createdAtDiff = new Date(b.createdAt) - new Date(a.createdAt);
      if (createdAtDiff !== 0) return createdAtDiff;
      return new Date(b.updatedAt) - new Date(a.updatedAt); // If createdAt is the same, compare by updatedAt
    });

    res.json({
      tweets: combinedTweets,
      pagination: {
        page,
        pageSize,
        totalTweets,
        totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tweets", error });
  }
};

// Utility function to share tweet with users
async function shareTweetWithUsers(tweetId, sharedWithUserIds) {
  // Find the tweet
  const tweet = await Tweet.findByPk(tweetId);
  if (!tweet) {
    throw new Error("Tweet not found");
  }

  // Create the shares records in the database
  const shares = sharedWithUserIds.map((userId) => ({
    tweetId,
    sharedWithUserId: userId,
  }));
  await UserTweetShare.bulkCreate(shares);

  // Fetch the shared users' details to send an email
  const sharedUsers = await User.findAll({
    where: { id: sharedWithUserIds },
  });

  // Send an email to each user
  sharedUsers.forEach((user) => {
    sendEmail(user.email, tweet.content);
  });
}
