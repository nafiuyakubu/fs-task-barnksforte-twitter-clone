const express = require("express");
const {
  updateProfile,
  userSuggestion,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.put("/update-profile", authMiddleware, updateProfile);
router.get("/suggestions", authMiddleware, userSuggestion);

module.exports = router;
