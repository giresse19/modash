<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style>
header,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 500;
}
header img {
  display: block;
  max-width: 100%;
}
#app {
  font-family: "Open Sans", Arial, Helvetica, sans-serif;
  margin: 1rem;
  font-style: normal;
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.loader {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
