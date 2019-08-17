<template>
  <span>
    <adminheader></adminheader>
    <div class="wrapper">
      <adminsidebar></adminsidebar>
      <div id="contents">
        <div class="container">
          <!-- <div id="home" > -->
          <router-view></router-view>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import adminheader from "@/components/admin/admin-header";
import adminsidebar from "@/components/admin/sidebar";
export default {
  components: {
    adminheader,
    adminsidebar
  },
  mounted() {
    // this.charts();
  },
  methods: {
    
  }
};
</script>


