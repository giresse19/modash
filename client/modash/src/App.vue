<template>
  <div id="app">    
    <Header />
    <UserList />
    <Profile />
  </div>
</template>

<script>
import UserList from './components/UserList.vue'
import Profile from './components/Profile.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
    UserList,
    Profile
  }
}
</script>

<style>
img {
    display: block; 
    max-width: 100%;
}
header, h1, h2, h3, h4, h5, h6 {
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 500;
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
</style>
