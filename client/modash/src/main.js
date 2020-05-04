import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueRouter from "vue-router";
import UserList from "./components/UserList.vue";
import Profile from "./components/Profile.vue";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: UserList },
  { path: "/profile/:username", name: "profile", component: Profile },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
