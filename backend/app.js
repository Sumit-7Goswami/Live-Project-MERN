
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const urlRoutes = require("./routes/urlRoutes");
const { Log } = require("../logging-middleware/logger");

const app = express();

// Middleware
app.use(cors());

app.use(express.json());

// Log every request
app.use((req, res, next) => {

  Log("backend", "info", "middleware", `Incoming request: ${req.method} ${req.url}`);
  next();

});

// Routes
app.use("/", urlRoutes);

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/urlshortener", {

    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(() => {

    Log("backend", "info", "config", "MongoDB connected successfully");

    app.listen(5000, () => {
      console.log(" Server running on http://localhost:5000");
    });

  })
  .catch((err) => {
    Log("backend", "fatal", "config", `MongoDB connection failed: ${err.message}`);
  });
