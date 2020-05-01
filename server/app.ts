export {};
const db = require("./config/db.ts");
const services = require("./app/services/profile.ts");

const express = require("express");
const app = express();

// connect to DB
db.connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.use((req:any, res:any, next:any) => {
  res.setHeader("Content-Type", "application/json");
  res.header('Access-Control-Allow-Origin', '*'); // since development is only local no issues with CORS
  next();
});

// Defined routes:
app.use("/analyze/username", require("./app/routes/api/getUsername.ts"));

app.get("/api/v1/all", async (req:any, res: any) => await services.getAllUsers(req, res));
app.get("/api/v1/profile", async (req:any, res: any) => await services.getUser(req.query.name, res));

module.exports = app;