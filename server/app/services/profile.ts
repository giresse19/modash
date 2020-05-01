const getMediaFunc = require("../helper/getMedia.ts");
const helper = require("../helper/getImageRequest.ts");

const User = require("../models/User.ts");

module.exports = {
  profile: async function (req: any, res: any, name: string) {
    try {
      const results = await helper.getProfile(name);

      const {
        edge_followed_by,
        edge_felix_video_timeline,
        full_name,
        edge_follow,
        overall_category_name,        
        profile_pic_url,
        website,
        id,
        edge_owner_to_timeline_media,
        biography,
        username,
      } = results.data.graphql.user;

      let followers_count = edge_followed_by.count;
      let follows_count = edge_follow.count;

      // const videoMedia = edge_felix_video_timeline.edges;
      const { media_count, edges } = edge_owner_to_timeline_media;

      const { media, engagement, total_likes, like_count } = getMediaFunc(
        edges
      );

      // const media = getMediaFunc(videoMedia);
      console.log("media details", total_likes, like_count);
      const average_likes = (total_likes / like_count);

      const insights = await helper.getImageInsights(media);
      const userProfile = await User.findOne({ name });

      if (userProfile) {
        User.findOneAndRemove({ name: name }, (error: any, user: any) => {
          if (error) {
            console.error(error);
          } else {
            console.log("profle updated");
          }
        });
      }

      const user = new User({
        biography,
        followers_count,
        follows_count,
        media_count,
        full_name,
        website,
        overall_category_name,
        profile_pic_url,
        name: username,
        user_ig_id: id,
        media,
        engagement,
        average_likes: average_likes,
        insights,
      });

      user.save();
      res.json("profile added to DB");
    } catch (err) {
      console.error(err);
    }
  },

  getAllUsers: async (req: any, res: any) => {
    try {
      User.find({}, async (err: any, users: any[]) => {
        const userMap: any = [];

        if (users.length === 0) {
          res.json({
            errors: [
              {
                msg: "No User found!",
              },
            ],
          });
        }
        users.forEach(function (user) {
          userMap.push(user);
        });

        res.json(userMap);
      });
    } catch (err) {
      res.status(500).json({ errors: [{ msg: err }] });
    }
  },

  getUser: async (name: string, res: any) => {
    try {
      const user = await User.findOne({ name });
      if (user) {
        res.json(user);
      } else {
        res.status(400).json({
          errors: [
            {
              msg:
                "User dont exist in DB! Please enter user via the /analyze/username end-point",
            },
          ],
        });
      }
    } catch (err) {
      res.status(500).json({ errors: [{ msg: err }] });
    }
  },
};
