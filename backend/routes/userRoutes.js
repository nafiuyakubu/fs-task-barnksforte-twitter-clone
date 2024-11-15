const express = require("express");
const { updatePassword } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.put("/update-profile", authMiddleware, updatePassword);

module.exports = router;
