<template>
  <div>
    <div class="back-button">
      <a href="/"><img src="../assets/arrow.png" alt="followings"/></a>
      <div class="loader" v-if="!profileDataIsLoaded && isEmpty(error)">
        <img height="87" width="100" src="../assets/load.svg" alt="loader" />
      </div>
      <div class="loader" style="width: 471px;" v-if="!isEmpty(error)">
        <strong>{{ error.message }}</strong>
      </div>
    </div>
    <div class="profile">
      <article class="main" v-if="profileDataIsLoaded && isEmpty(error)">
        <section>
          <article class="media-top">
            <div class="col-0" style="margin-bottom: 110px">
              <figure class="image is-64x64 upwards">
                <img
                  :src="profileData.profile_pic_url"
                  alt="Image"
                  style="width: 130px"
                />
                <br />
                <strong>{{ profileData.full_name }}</strong>
                <div>
                  <small style="">@{{ profileData.name }} </small>
                </div>
              </figure>
            </div>
          </article>
        </section>

        <section>
          <article class="media">
            <div class="col-1">
              <figure>
                <img src="../assets/following.png" alt="followings" />
                <br />
                <strong>{{ profileData.follows_count }}</strong>
                <br />
                <span class="others">Following</span>
              </figure>
            </div>
            <div class="col-2">
              <figure>
                <img src="../assets/following.png" alt="followers" />
                <br />
                <strong>{{ profileData.followers_count }}</strong>
                <br />
                <span class="others">Followers</span>
              </figure>
            </div>
            <div class="col-3" v-if="profileData.media.length !== 0">
              <figure>
                <img src="../assets/heart.png" alt="likes" />
                <br />
                <strong>{{
                  Math.round(
                    (profileData.average_likes + Number.EPSILON) * 100
                  ) / 100
                }}</strong>
                <br />
                <span class="others">Average Likes</span>
              </figure>
            </div>
            <div class="col-4" v-if="profileData.media.length !== 0">
              <figure>
                <img src="../assets/engage.png" alt="engagement" />
                <br />
                <strong>
                  ({{
                    (
                      profileData.engagement / profileData.followers_count
                    ).toFixed(2)
                  }})%</strong
                >
                <br />
                <span class="others">Engagement Rate</span>
              </figure>
            </div>
          </article>
        </section>

        <section>
          <article class="media" style="background-color: white">
            <div class="col-5">
              <div class="tags hashtags">
                Popular #hashtags and @mentions
              </div>
              <br />
              <div
                style="margin-left: 15px;  margin-bottom: 14px;"
                v-if="profileData.media.length !== 0"
              >
                <span
                  class="tag-words"
                  style="padding-left: 10px;"
                  v-for="hashtag in profileData.popular_tags.hashtag"
                  :key="hashtag.tag"
                >
                  {{ hashtag.tag }}
                </span>
                <br />
                <br />
                <span
                  class="tag-words"
                  style="padding-left: 10px;"
                  v-for="mention in profileData.popular_tags.mention"
                  :key="mention.tag"
                >
                  {{ mention.tag }}
                </span>
              </div>
            </div>
          </article>
        </section>

        <section>
          <article class="media" style="grid-auto-columns: 1fr;">
            <div class="col-6">
              <div class="tags">brand affinity</div>
              <br />
              <div class="insights" v-if="profileData.media.length !== 0">
                <div class="table">
                  <div class="left">
                    <span
                      class=""
                      style=""
                      v-for="brand in profileData.insights.brands"
                      :key="brand._id"
                    >
                      {{ brand.description }}
                      <br />
                      <br />
                    </span>
                  </div>
                  <div class="right">
                    <span
                      class=""
                      style=""
                      v-for="brand in profileData.insights.brands"
                      :key="brand._id"
                    >
                      {{ Math.round((brand.score + Number.EPSILON) * 100) }}%
                      <br />
                      <br />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-7">
              <div class="tags">Interests</div>
              <br />
              <div class="insights" v-if="profileData.media.length !== 0">
                <div class="table">
                  <div class="left">
                    <span
                      class=""
                      style=""
                      v-for="label in profileData.insights.labels"
                      :key="label._id"
                    >
                      {{ label.description }}
                      <br />
                      <br />
                    </span>
                  </div>
                  <div class="right">
                    <span
                      class=""
                      style=""
                      v-for="label in profileData.insights.labels"
                      :key="label._id"
                    >
                      {{ Math.round((label.score + Number.EPSILON) * 100) }}%
                      <br />
                      <br />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section>
          <article>
            <strong style="padding-left:35px">
              <img src="../assets/instagram.png" alt="followings" />
              Latest Post
            </strong>
            <div class="media" v-if="profileData.media.length !== 0">
              <div
                class="col-8"
                v-for="media in profileData.media"
                :key="media._id"
              >
                <div class="row" v-if="media.media_url">
                  <div class="row-top right">
                    <span> {{ formatTimeStamp(media.timestamp) }}</span>
                  </div>
                  <div class="row-mid">
                    <img :src="media.media_url" alt="Image" class="media-pic" />
                  </div>

                  <div class="row-bottom">
                    <div class="media-perks" v-if="media.video_view_count">
                      <div class="video">
                        <img src="../assets/video.png" alt="likes" />
                        <span>{{ media.video_view_count }}</span>
                      </div>
                      <div class="likes">
                        <img src="../assets/heart.png" alt="likes" />
                        <span>{{ media.like_count }}</span>
                      </div>
                      <div class="comments">
                        <img src="../assets/comment.png" alt="likes" />
                        <span>{{ media.comments_count }}</span>
                      </div>
                    </div>
                    <div class="media-perks" v-if="!media.video_view_count">
                      <div class="no-vid-likes">
                        <img src="../assets/heart.png" alt="likes" />
                        <span>{{ media.like_count }}</span>
                      </div>
                      <div class="no-vid-comments">
                        <img src="../assets/comment.png" alt="likes" />
                        <span>{{ media.comments_count }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-9"></div>
              <div class="col-10"></div>
            </div>
          </article>
        </section>
      </article>
    </div>
  </div>
</template>

<script>
import config from "../config/config";
import axios from "axios";
import moment from "moment";

export default {
  name: "Profile",
  data() {
    return {
      username: this.$route.params.username,
      profileData: {},
      profileDataIsLoaded: false,
      error: {},
    };
  },

  methods: {
    async loadProfileData(username) {
      try {
        const user = await axios.get(
          `${config.BASE_URL}/api/v1/profile?name=${username}`
        );
        if (user.status === 200) {
          this.profileDataIsLoaded = true;
          this.profileData = user.data;
        }
      } catch (error) {
        this.error = error.response.data;
      }
    },
    isEmpty(obj) {
      if (obj) {
        return Object.keys(obj).length === 0;
      }
    },
    formatTimeStamp(timestamp) {
      return moment.unix(timestamp).format("MMMM D, YYYY");
    },
  },
  mounted() {
    this.loadProfileData(this.username);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile {
  max-width: 1200px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px #eeeeee;
  border-radius: 2px;
  margin-bottom: 20px;
  margin-top: 10px;
}

.upwards {
  margin: -60px;
}

.tag-words {
  background: #114b5f;
  border-radius: 33px;
  color: white;
  padding: 3px;
  margin: 3px;
  margin-bottom: 2px;
}

.back-button {
  max-width: 1200px;
  margin: 0 auto;
  cursor: pointer;
  padding: 2px;
}
article {
  padding: 0em;
}

.media {
  display: grid;
  grid-gap: 10px;
  align-items: center;
  margin: 27px;
}
.media-top {
  display: grid;
  grid-gap: 10px;
  align-items: center;
}

.table {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

figure {
  display: flex;
  align-items: center;
  flex-direction: column;
}

section {
  margin-bottom: 20px;
}

.media .col-1 {
  grid-column: 1/2;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px #eeeeee;
}

.media .col-2 {
  grid-column: 2/3;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px #eeeeee;
}
.media .col-3 {
  grid-column: 3/4;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px #eeeeee;
}
.media .col-4 {
  grid-column: 4/5;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px #eeeeee;
}
.media .col-5 {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px #eeeeee;
}
.media .col-6 {
  grid-column: 1/2;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px #eeeeee;
  padding: 15px;
  height: 277px;
}
.media .col-7 {
  grid-column: 2/3;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px #eeeeee;
  padding: 15px;
}
ˇ .media .col-8 {
  grid-column: 1/2;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px #eeeeee;
}
.media .col-9 {
  grid-column: 2/3;
}
.media .col-10 {
  grid-column: 3/4;
}
.media-pic {
  height: 100%;
  width: 100%;
  border-radius: 0px;
}
.insights {
  display: grid;
}
.left {
  display: flex;
  flex-direction: column;
}
.right {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  line-height: 18px;
  color: #757575;
}
.row {
  display: grid;
  grid-gap: 1px;
  padding: 13px;
}
.row-top {
  grid-row: 1/2;
}
.row-mid {
  grid-row: 2/3;
  background: #ffffff;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px #eeeeee;
}
.row-bottom {
  grid-row: 3/4;
}
.media-perks {
  display: grid;
  grid-gap: 0px;
}
.video {
  grid-column: 1/2;
}
.likes {
  grid-column: 2/3;
}
.comments {
  grid-column: 3/4;
}
.hashtags {
  padding: 17px;
  padding-bottom: 0px;
  margin: 2px;
  margin-left: 12px;
}
.no-vid-likes {
  grid-column: 1/2;
}
.no-vid-comments {
  grid-column: 2/3;
}
img {
  border-radius: 171px;
}
strong {
  color: #000000;
  font-size: 20px;
  line-height: 25px;
}
small {
  font-size: 14px;
  line-height: 18px;
  color: #2f80ed;
}

div .tags {
  color: #000000;
  font-size: 20px;
  line-height: 25px;
  font-weight: bold;
  padding: 5px;
}

span .others {
  font-size: 14px;
  line-height: 18px;
  color: #828282;
}
</style>
