const express = require("express");
const app = express();
const db = require("./config/db");
const config = require("./config/config");

const services = require("./app/services/profile");
const errorHandler = require("errorhandler");

// connect to DB
db.connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Defined routes:
app.use("/analyze/username", require("./app/routes/api/getUsername"));

app.get("/api/v1/profile", async (req, res) => await services.getUser(req.query.name, res));

app.listen(config.port, () =>
  console.log(`Server started on port ${config.port}`)
);

if ("development" == config.env) {
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}
