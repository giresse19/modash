export{}
const db = require("./config/db.ts");
const services = require("./app/services/profile.ts");

const express = require("express");
const app = express();

// connect to DB
db.connectDB();

app.use(express.json({ extended: false }));

app.use((req: any, res: any, next: any) => {
  res.setHeader("Content-Type", "application/json");

  // To avoid CORS issues
  res.header("Access-Control-Allow-Origin", "*");

  // To parse responses from services and return them as proper API responses
  res.apiResponse = (err, message) => {
    let status = err ? err.status || 500 : 200;
    message = (err && err.message) || message;

    return res.status(status).end(JSON.stringify({ status, message }));
  };
  next();
});

// Defined routes:
app.use("/analyze/username", require("./app/routes/api/getUsername.ts"));

app.get(
  "/api/v1/all",
  async (req: any, res: any) =>
    await services.getAllUsers(req, res, res.apiResponse)
);

app.get(
  "/api/v1/profile",
  async (req: any, res: any) => await services.getUser(req.query.name, res, res.apiResponse)
);

app.use(
  (
    req: any,
    res: { apiResponse: (arg0: { status: number; message: string }) => any }
  ) => res.apiResponse({ status: 404, message: "Page not found" })
);

app.use(
  (
    err: string,
    req: any,
    res: { apiResponse: (arg0: string) => any },
    next: any
  ) => res.apiResponse("Server error. " + err)
);

module.exports = app;
