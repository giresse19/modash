<template>
  <div class="profile">
    <article class="main">
      <section>
        <article class="media" style="background-color: blue">
          <div class="col-0">
            <figure class="image is-64x64">
              Picture
              <!-- <img :src="user.profile_pic_url" alt="Image">  -->
              <p>
                <strong>full name</strong>
                <br />
                <small>name </small>
              </p>
            </figure>
          </div>
        </article>
      </section>

      <section>
        <article class="media" style="background-color: green">
          <div class="col-1">
            <figure>
             <img src="../assets/following.png" alt="followings"> 
              <strong>following</strong>
              <br />
              <span class="others">Following</span>
            </figure>
          </div>
          <div class="col-2">
            <figure>
             <img src="../assets/following.png" alt="followers">
              <strong>followers</strong>
              <br />
              <span class="others">Followers</span>
            </figure>
          </div>
          <div class="col-3">
            <figure>
              <img src="../assets/heart.png" alt="likes">
              <strong>Average likes</strong>
              <br />
              <span class="others">Average Likes</span>
            </figure>
          </div>
          <div class="col-4">
            <figure>
             <img src="../assets/engage.png" alt="engagement">
              <strong> engagement rate</strong>
              <br />
              <span class="others">Engagement Rate</span>
            </figure>
          </div>
        </article>
      </section>

      <section>
        <article class="media" style="background-color: white">
          <div class="col-5">
            <div class="tags" style="padding: 17px, padding-bottom: 0px;">Popular #hashtags and @mentions</div>
            <br />
            <span style="padding-left: 10px;"
              >unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently
              with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum</span
            >
          </div>
        </article>
      </section>

      <section>
        <article class="media" style="background-color: orange">
          <div class="col-6">
            <div class="tags">brand affinity</div>
            <br />
            <div class="insights">
              <div class="left">
                <span>description</span>
              </div>
              <div class="right">
                <small>score</small>
              </div>
            </div>
          </div>

          <div class="col-7">
            <div class="tags" >Interests</div>
            <br />
            <div class="insights">
              <div class="left">
                <span>description</span>
              </div>
              <div class="right">
                <small>score</small>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section>
        <article style="background-color: purple">
          <strong style="padding:17px">Latest Post</strong>

          <div class="media">
            <div class="col-8">
              <div class="row">
                <div class="row-top">
                  <small> timestamp</small>
                </div>
                <div class="row-mid">
                  picture
                  <!-- <img :src="user.profile_pic_url" alt="Image"> -->
                </div>

                <div class="row-bottom">
                  <div class="media-perks">
                    <div class="likes">
                      <span>likes</span>
                    </div>
                    <div class="comments">
                      <span>comments</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-9">
              <div class="row">
                <div class="row-top">
                  <small> timestamp</small>
                </div>
                <div class="row-mid">
                  picture
                  <!-- <img :src="user.profile_pic_url" alt="Image"> -->
                </div>

                <div class="row-bottom">
                  <div class="media-perks">
                    <div class="likes">
                      <span>likes</span>
                    </div>
                    <div class="comments">
                      <span>comments</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-10">
              <div class="row">
                <div class="row-top">
                  <small> timestamp</small>
                </div>
                <div class="row-mid">
                  picture
                  <!-- <img :src="user.profile_pic_url" alt="Image"> -->
                </div>

                <div class="row-bottom">
                  <div class="media-perks">
                    <div class="likes">
                      <span>likes</span>
                    </div>
                    <div class="comments">
                      <span>comments</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </article>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";

export default {
  name: "Profile",
  methods: {},
  // computed: mapGetters(['users']),
  created() {
    // this.fetchUsers()
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

article {
  padding: 0em;
}

.media {
  display: grid;
  grid-gap: 10px;
  align-items: center;
}

figure {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.media .col-0 {
}

.media .col-1 {
  grid-column: 1/2;
}

.media .col-2 {
  grid-column: 2/3;
}
.media .col-3 {
  grid-column: 3/4;
}
.media .col-4 {
  grid-column: 4/5;
}
.media .col-5 {
  width: 60%;
}
.media .col-6 {
  grid-column: 1/2;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px #eeeeee;
  padding: 15px;
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
}
.media .col-9 {
  grid-column: 2/3;
}
.media .col-10 {
  grid-column: 3/4;
}
.insights {
  display: grid;
}
.left {
  grid-column: 1/2;
}
.right {
  grid-column: 2/3;
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
}
.row-bottom {
  grid-row: 3/4;
}
.media-perks {
  display: grid;
  grid-gap: 0px;
}
.likes {
  grid-column: 1/2;
}
.comments {
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
