export {}
const mongoose = require('mongoose');
const configDB = require('./config.ts');

const connectDB = async () => {
    try {
        await mongoose.connect(configDB.db.uri, { 
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