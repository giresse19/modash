var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appSchema = new Schema({
	app_ig_id: {
		type: String,		
    },
    app_fbPage_id: {
		type: String,		
    },
    app_access_token: {
		type: String,		
    },
    timestamp: {
      type: Date,
      default: Date.now
  }

});

module.exports = mongoose.model('App', appSchema, 'appInfo' );
