
process.on('uncaughtException', console.error);

const config = require("./config/config.ts");
const errorHandler = require("errorhandler");
const expressApp = require('./app');

expressApp.listen(config.port, () =>
  console.log(`Server started on port ${config.port}`)
);

if ("development" == config.env) {
  expressApp.use(errorHandler({ dumpExceptions: true, showStack: true }));
}
