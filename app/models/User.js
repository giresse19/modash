var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

	id:{
		type: String,
	}, 

	username: {
		type: String,
		required: true
	},

	full_name:{
		type: String,
	}, 

	bio:{
		type: String,
	}, 

	website:{
		type: String,
	}, 

	profile_picture:{
		type: String,
	}, 
	
	access_token:{
		type: String,
	}, 

});

module.exports = mongoose.model('User', userSchema);
