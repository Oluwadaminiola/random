<template>
  <div id="events">
        <div class="d-flex row">
          <div class="pr-3 py-2">
            <h4>Your Posts</h4>
          </div>
          <div class="px-lg-3 px-xs-0 py-2">
          <router-link :to="{path:'/blog/create'}" > <button class="btn btn-yellow" style="width: 9em;">Create A Post</button></router-link>
          </div>
        </div>
        <ul class="nav nav-tabs">
          <li class="px-3 py-2 " :class="{'active':active == 0}" @click="setActive(0)">
            <a data-toggle="tab"  >Drafts</a>
          </li>
          <li class="px-3 py-2" :class="{'active':active == 1}" @click="setActive(1)">
            <a data-toggle="tab" >Published</a>
          </li>
          <li class="px-3 py-2" :class="{'active':active == 2}" @click="setActive(2)">
            <a data-toggle="tab">Retracted</a>
          </li>
        </ul>
        <div class="tab-content">
          <div id="drafts" >
            <div class="row">
              <div class="col-xl-12">
                  <blog :status="active"></blog>
                  <!-- <blog ></blog> -->
              </div>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
import blog from '@/components/admin/blog-row'
export default {
    data(){
        return {
            active:'0'
        }
    },
    components:{
        blog
    },
    methods:{
        setActive(active){
            this.active = active
        }
    }
};
</script>
<style scoped>
.px-3,
.py-2 {
  cursor: pointer !important;
}
</style>

