const express = require("express");
const {
  createTweet,
  shareTweet,
  getTweets,
} = require("../controllers/tweetController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware, createTweet);
router.get("/", authMiddleware, getTweets);

module.exports = router;
