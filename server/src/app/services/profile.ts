const getMediaFunc = require("../helper/getMedia.ts");
const helper = require("../helper/getImageRequest.ts");

const caption = require("../helper/parseCaption");

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

      const videoMedia = edge_felix_video_timeline.edges;

      const { media_count, edges } = edge_owner_to_timeline_media;

      const videoAndPictureMedia = videoMedia.concat(edges);

      const { media, engagement, total_likes, like_count } = getMediaFunc(
        videoAndPictureMedia
      );

      const insights = await helper.getImageInsights(media);

      // get average likes
      const average_likes = like_count !== 0 ? total_likes / like_count : 0;

      const popular_tags = await caption.captionMode(media);

      const userProfile = await User.findOne({ name });

      // remove old user in DB, inorder to update with newly fetch/scraped result from instagram API.
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
        popular_tags,
      });

      user.save();
      res.json("profile added to DB");
    } catch (err) {
      console.error(err);
    }
  },

  getAllUsers: async (
    req: any,
    res: any,
    callback: (arg0: { status: number; message: string }) => any
  ) => {
    try {
      User.find({}, async (err: any, users: any[]) => {
        const userMap: any = [];
        if (users.length === 0)
          return void callback({
            status: 400,
            message:
              "No IG user added! Please Add users to DB (path: /analyze/username), inorder to view list."
          });

        users.forEach(function (user) {
          userMap.push(user);
        });

        res.json(userMap);
      });
    } catch (err) {
      return void callback(err);
    }
  },

  getUser: async (
    name: string,
    res: any,
    callback: (arg0: { status: number; message: string }) => any
  ) => {
    try {
      const user = await User.findOne({ name });
      if (user) {
        res.json(user);
      } else {
        return void callback({
          status: 400,
          message:
            "User dont exist in DB! Please enter user via the /analyze/username end-point",
        });
      }
    } catch (err) {
      return void callback(err);
    }
  },
};
