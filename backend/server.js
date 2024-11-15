const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const tweetRoutes = require("./routes/tweetRoutes");
const userRoutes = require("./routes/userRoutes");
const { sequelize } = require("./models");

const corsOptions = {
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions)); //Cors Enabled(Dev Purpose)

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tweets", tweetRoutes);
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 4000;
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
  });
