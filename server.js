const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Task Tracker API Running");
});

// IMPORTANT: connect AFTER export-safe setup
const connectDB = require("./config/db");
connectDB();

module.exports = app;