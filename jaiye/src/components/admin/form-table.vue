<template>
  <form onsubmit="return false" class="form-inline my-3">
    <div class="d-flex row">
      <div class="p-2 my-2">
        <router-link :to="{path:path}">
          <button class="btn btn-yellow" style="width: 7em;">Create {{text}}</button>
        </router-link>
      </div>
      <div class="form-inline p-2 my-2">
        <search @daterange="daterange"></search>
      </div>
      <!-- <div class="p-2 my-2" >
                                                                    <button class="btn btn-blue " style="width: 9em;" >Search</button>
      </div>-->
      <!-- <div class="p-2 my-2"></div> -->
      <div class="p-2 my-2">
        <sortby @by="sortby"></sortby>
      </div>
    </div>
  </form>
</template>
<script>
import search from "@/shared/dashboar-search-header";
import sortby from "@/shared/sortby"
export default {
  data() {
    return {
      filter: ""
    };
  },
  props: ["path", "text"],
  components: {
    search,sortby
  },
  methods: {
    daterange(range) {
      this.$emit("daterange",range)
    },
    sortby(filter){
            this.filter = filter;
    }
  }
};
</script>
<style scoped>
button {
  margin-top: 5px;
}
</style>
