<template>
      <header>
        <div class="row">
            <div class="logo">                
               <a href="/"> <img alt="Modash logo" src="../assets/logo.png" ></a>
            </div>
        </div>      
    </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* Mobile first design */
header {
    border-bottom: 0px solid #9EA9C1;
}
main {
  border-top: 0px solid #dddddd;
  margin-top: 0.5rem;
}
header .row {
    display: flex;
    flex-flow: row nowrap;
}


/*
    desktop behavior -- 
  */
 @media (min-width: 800px) {
      header, main {
          border: none;
          margin: 0;
          margin-bottom: 80px;          
      }
      .logo{
        cursor: pointer;
      }
 }


</style>
