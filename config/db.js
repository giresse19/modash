const mongooseConnect = require('mongoose');
const config = require('./config');

const appInfo = require('../app/models/App');

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

module.exports = {    

    getAccessToken: async () => {              
        let token = await appInfo.find({}, {_id: 0, app_access_token : 1 });
         console.log("token returned", token[0].app_access_token);
        return token[0].app_access_token;
    },

    getAppId:  async () => {     
        let app_id = await appInfo.find({}, {_id: 0, app_ig_id : 1 });   
        console.log("AppId returned", app_id[0].app_ig_id);
        return app_id[0].app_ig_id
    },

    connectDB
} 