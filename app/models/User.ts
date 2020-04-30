var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  user_ig_id: {
    type: String,
  },
  name: {
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

  overall_category_name: {
    type: String,
  },

  media: [
    {
      media_url: String,
      timestamp: Date,
      comments_count: Number,
      like_count: Number,
      id: String,
    },
  ],

  insights:
    {
      labels: [String],
      brands: [String],
    
    },
  
});

module.exports = mongoose.model("User", userSchema, "user");
