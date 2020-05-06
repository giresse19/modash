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

  profile_pic_url: {
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

  engagement: {
    type: Number,
  },

  average_likes :{
    type: Number
  },

  overall_category_name: {
    type: String,
  },
  
  popular_tags: {
    type: Object,
  },

  media: [
    {
      media_url: String,
      timestamp: String,
      comments_count: Number,
      like_count: Number,
      MediaEngagement:Number,
      caption:String,
      video_view_count :Number,
      id: String,
    },
  ],

  insights:
    {
      labels: [
        {
          description: String,
          score: Number
        }
       
      ],
      brands: [
        {
          description: String,
          score: Number
        }
      ],
    
    },
  
});

module.exports = mongoose.model("User", userSchema, "user");
