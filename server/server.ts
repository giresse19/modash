export {}; // handle block scope issue with ts

const config = require("./config/config.ts");
const errorHandler = require("errorhandler");
const app = require('./app');

app.listen(config.port, () =>
  console.log(`Server started on port ${config.port}`)
);

if ("development" == config.env) {
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}
