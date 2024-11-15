const express = require("express");
const { updateProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.put("/update-profile", authMiddleware, updateProfile);

module.exports = router;
