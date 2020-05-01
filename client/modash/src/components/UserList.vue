<template>
<div class="users">
  <div v-for="user in users" :key="user._id" class="user">     
        <article class="media">
          <div class="col-1">
            <figure class="image is-64x64" >             
              <img :src="user.profile_pic_url" alt="Image"> 
              <p>
                <strong>{{user.full_name}}</strong> 
                <br>
                <small>@{{user.name}} </small>            
              </p>
            </figure>                           
          </div>          
            <div class="col-2"> 
              
                <strong>{{user.followers_count}}</strong> 
                <br>
              <span class="others">Followers</span>
              
            </div>
              <div class="col-3">
                 <strong>({{(user.engagement / user.followers_count).toFixed(2)}})%</strong> 
                <br>
                <span class="others">Engagement(Engagement rate)</span> 
              </div>          
        </article>      
  </div>
    </div>  
</template>

<script >
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'UserList',
  methods: { 
    ...mapActions(['fetchUsers'])
  },
  computed: mapGetters(['users']),
  created() {
    this.fetchUsers()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user {
  max-width: 1200px;
  margin: 0 auto;  
  background: #FFFFFF;
  border: 1px solid #EEEEEE;
  box-sizing: border-box;
  box-shadow: 2px 2px 8px #EEEEEE;
  border-radius: 2px;
  margin-bottom: 20px;
  margin-top: 10px;
}

article {   
    padding: 0em;
}

.media{
  display: grid;
  grid-gap: 10px;
align-items: center;
}

figure{
  display: flex;
  align-items: center;
  cursor: pointer;
}

.media .col-1{
grid-column: 1/2;
}

.media .col-2{
grid-column: 2/3;
}
.media .col-3{
grid-column: 3/4;
}

img {
  border-radius: 171px;;
}
strong{
  color: #000000;
  font-size: 20px;
line-height: 25px;
}
small{
font-size: 14px;
line-height: 18px;
color: #2F80ED; 
}

span .others {
font-size: 14px;
line-height: 21px;
  color: #828282;
}

</style>
