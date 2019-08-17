<template>
<nav class="navv navbar fixed-top navbar-expand-lg">
    <a class="navbar-brand px-3" style="padding-left:2em !important;padding-right:1em !important" href="home-page.html"><img :src="require('@/assets/img/Group.png')"></a>
    <!-- <button type="button" id="sidebarCollapse" class="navbar-btn mx-lg-1">
            <span></span>
            <span></span>
            <span></span>
    </button> -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navcol" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <img class="my-image" :src="require('@/assets/img/jaiye-avatar.svg')">
    </button>
    <div class="collapse navbar-collapse" id="navcol">
            <form class="form-inline pl-lg-4 pl-xs-0">
                <div class="input-group">
                    <div class="input-group-addon my-input">
                        <span class="input-group-text">
                            <img :src="require('@/assets/img/Search-Icon.png')">
                        </span>
                    </div>
                    <input type="text" class="form-control" width="40%" placeholder="search e.g names, location">
                </div>
            </form>
        <ul class="nav navbar-nav  ml-auto">
                <li class="nav-item mx-lg-3 mx-xs-0"><a class="nav-link" href="#"><img :src="require('@/assets/img/Combined Shape.png')"></a></li>
                <li class="nav-item mx-lg-3 mx-xs-0">
                        <!-- <a class="nav-link" href="#" >Maria Sharapova</a> -->
                        <div class="dropdown">
                                <button href="#" class="btn-clear" data-toggle="dropdown"><img :src="require('@/assets/img/Vector.png')"></button>
                                <ul class="dropdown-menu">
                                  <li @click="$logout"><a href="#">Logout</a></li>
                                  <!-- <li><a href="#">Another action</a></li> -->
                                  <!-- <li><a href="#">Something else here</a></li> -->
                                </ul>
                        </div>
                </li>
                <li class="nav-item mx-lg-3 mx-xs-0"><a class="nav-link" href="#"><img :src="require('@/assets/img/profile-image.svg')"> </a></li>
                <li class="nav-item mx-lg-3 mx-xs-0"><a class="nav-link" href="#">Admin</a></li>
        </ul>
    </div>
</nav>

</template>
<script>
export default {
    
}
</script>
<style scoped>
.input-group-addon{
    border: none !important;
    background: inherit !important; 
}
.py-3{
    padding-top: 5px !important;
    padding-bottom:5px !important;
}
.my-image{
    height:unset !important;
    width: unset !important;
}
</style>
