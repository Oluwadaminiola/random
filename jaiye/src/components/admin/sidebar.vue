<template>
  <nav id="sidebar">
    <ul class="list-unstyled components">
      <router-link :to="{path:'/dashboard'}" tag="li">
          <a class="px-5 mr-4 py-2">            
            Home</a>
      </router-link>
      <!-- <li> -->
        <router-link :to="{name:'event'}" tag="li">
          <a class="px-5 mr-4 py-2">Events</a>
        </router-link>
      <!-- </li> -->
      <!-- <li> -->
        <router-link :to="{name:'listing'}" tag="li">
        <a  class="px-5 mr-4 py-2">Listings</a>
        </router-link>
      <!-- </li> -->
      <!-- <li> -->
        <router-link :to="{name:'blog'}" tag="li">
        <a class="px-5 mr-4 py-2">Blog</a>
        </router-link>
      <!-- </li> -->
      <li>
        <a href="#" class="px-5 mr-4 py-2">Quiz</a>
      </li>
      <!-- <li> -->
        <router-link :to="{path:'/ad'}" tag="li">
        <a class="px-5 mr-4 py-2">Ads</a>
        </router-link>
      <!-- </li> -->
      <!-- <li> -->
        <router-link :to="{name:'attraction'}" tag="li">

        <a href="#" class="px-5 mr-4 py-2">Attractions</a>
        </router-link>
      <!-- <li> -->
        <router-link :to="{path:'/bestthings'}" tag="li">
        <a href="#" class="px-5 mr-4 py-2">Best Things</a>
        </router-link>
      <!-- </li> -->
      <!-- <li> -->
        <router-link :to="{path:'/complaints'}" tag="li">

        <a href="#" class="px-5 mr-4 py-2">Complaints</a>
        </router-link>
      <!-- </li> -->
      <!-- <li> -->
        <router-link :to="{path:'/users'}" tag="li">
        <a  class="px-5 mr-4 py-2">Users</a>
        </router-link>
      <!-- </li> -->

    </ul>
  </nav>
</template>
<script>
export default {
  mounted(){
    console.log(this.$router)
  }
};
</script>
<style scoped>
li{
    cursor: pointer;
    margin-top: 10%;

} 
.router-link-active{
    font-family: Gothic;
    border-radius: 2px;
    border-right: 5px solid #ffcc26;
    color:#ffcc26;
    padding-left: 0px;
}
a{
  text-decoration: none !important;

}
.router-link-active a{
    font-family: Gothic;
     background: #383e84;
     border-left: unset;
    /* border-radius: 10px; */
    color:#ffcc26 !important;


}

</style>
