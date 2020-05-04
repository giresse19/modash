<template>
  <div class="users">
    <div
      v-for="user in users"
      :key="user._id"
      class="user"
      @click="openProfile(user.name)"
    >
      <article class="media">
        <div class="col-1">
          <figure class="image is-64x64">
            <img :src="user.profile_pic_url" alt="Image" style="width: 60px" />
            <div style="width: 208px">
              <p>
                <strong>{{ user.full_name }}</strong>
                <br />
                <small>@{{ user.name }} </small>
              </p>
            </div>
          </figure>
        </div>
        <div class="col-2">
          <strong>{{ user.followers_count }}</strong>
          <br />
          <span class="others">Followers</span>
        </div>
        <div class="col-3">
          <strong
            >({{
              (user.engagement / user.followers_count).toFixed(2)
            }})%</strong
          >
          <br />
          <span class="others">Engagement(Engagement rate)</span>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserList",
  methods: {
    ...mapActions(["fetchUsers"]),
    openProfile(username) {
      this.$router.push({
        name: "profile",
        params: { username },
      });
    },
  },
  computed: mapGetters(["users"]),
  created() {
    this.fetchUsers();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user {
  max-width: 1200px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px #eeeeee;
  border-radius: 2px;
  margin-bottom: 20px;
  margin-top: 10px;
  cursor: pointer;
}

.media {
  display: grid;
  grid-gap: 10px;
  align-items: center;
}

figure {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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

img {
  border-radius: 60px;
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

span .others {
  font-size: 14px;
  line-height: 21px;
  color: #828282;
}
</style>
