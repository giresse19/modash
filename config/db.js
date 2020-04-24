const mongooseConnect = require('mongoose');
const config = require('./config');

const connectDB = async () => {
    try {
        await mongooseConnect.connect(config.db.uri, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
         });
        console.log("mongoDB connected..")
    } catch (err) {
        console.log("error", err);
        process.exit(1)
    }

}

module.exports = connectDB;