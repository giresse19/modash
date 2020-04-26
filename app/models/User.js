var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  user_id: {
    type: String,
  },
  username: {
    type: String,
  },

  full_name: {
    type: String,
  },

  biography: {
    type: String,
  },

  website: {
    type: String,
  },

  profile_picture_url: {
    type: String,
  },

  media_count: {
    type: Number,
  },

  followers_count: {
    type: Number,
  },

  follows_count: {
	type: Number,
  },
});

module.exports = mongoose.model("User", userSchema);
