const mongooseConnect = require('mongoose');
const config = require('./config');

const connectDB = async () => {
    try {
        await mongooseConnect.connect(config.db.uri, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false, 
         });
        console.error("mongoDB connected..")
    } catch (err) {
        console.error("error", err);
        process.exit(1)
    }

}

module.exports = {   
    connectDB
} 