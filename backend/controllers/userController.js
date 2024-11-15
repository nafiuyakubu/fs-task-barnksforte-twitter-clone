const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { body, validationResult } = require("express-validator");
const generateToken = require("../utils/generateToken.js");

// Middleware for validation
const validateProfileUpdate = [
  body("name").notEmpty().withMessage("Name is required"),
  body("password").isLength({ min: 6 }).withMessage("Password Min 6 Char"),
];

exports.updateProfile = [
  validateProfileUpdate, // Run validation middleware first
  async (req, res) => {
    const errors = validationResult(req); // Extract validation errors from the request

    // If there are validation errors, return them
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: errors.array() });
    }

    try {
      const user = await User.findByPk(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      const validPassword = await bcrypt.compare(
        req.body.oldPassword,
        user.password
      );
      if (!validPassword)
        return res.status(400).json({ message: "Incorrect current password" });

      const newPassword = await bcrypt.hash(req.body.newPassword, 10);
      await user.update({
        name: req.body.name,
        password: newPassword,
      });

      //Generate Token (JWT)
      const token = generateToken(res, user.id);

      res.status(201).json({
        message: "Profile Updated successfully",
        token,
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating profile", error });
    }
  },
];

exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};
