const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const generateToken = require("../utils/generateToken.js");
const Sequelize = require("sequelize");

// Middleware for validation
const validateRegistration = [
  body("name").notEmpty().withMessage("Name is required"),
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password").isLength({ min: 6 }).withMessage("Password Min 6 Char"),
];
const validateLogin = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

exports.register = [
  validateRegistration, // Run validation middleware first
  async (req, res) => {
    const errors = validationResult(req); // Extract validation errors from the request

    // If there are validation errors, return them
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: errors.array() });
    }

    try {
      const { name, username, email, password } = req.body;

      // Check if username already exists
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        return res.status(400).json({ message: "Username is already taken" });
      }

      // Check if email already exists
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ message: "Email is already registered" });
      }

      // If no conflict, hash the password and create the user
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
      });

      if (user) {
        //Generate Token (JWT)
        const token = generateToken(res, user.id);

        res.status(201).json({
          message: "User registered successfully",
          token,
          id: user.id,
          name: user.name,
          email: user.email,
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }

      // res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error registering user", error });
    }
  },
];

exports.login = [
  validateLogin, // Run validation middleware first
  async (req, res) => {
    const errors = validationResult(req); // Extract validation errors from the request

    // If there are validation errors, return them
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: errors.array() });
    }

    try {
      const user = await User.findOne({
        where: {
          [Sequelize.Op.or]: [
            { username: req.body.username },
            { email: req.body.username },
          ],
        },
      });
      if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      //Generate Token (JWT)
      const token = generateToken(res, user.id);
      // console.log(token);

      res.json({
        message: "Login successful",
        token,
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error logging in", error });
    }
  },
];

exports.logout = async (req, res) => {
  // @desc  Logout user / clear cookie
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
};

//Sample Registration Data
// {
//   "name": "Nafiu Yakubu",
//   "username": "nafiu",
//   "email": "naf.yak69@gmail.com",
//   "password": "123456"
// }

//Sample login Data
// {
//   "username": "nafiu",
//   "password": "123456"
// }
