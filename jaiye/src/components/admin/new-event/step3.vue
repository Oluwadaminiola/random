<template>
  <div class="formbod p-5">
    <p>Events Details</p>
    <div class="form-group row">
      <div class="col-md-12">
        <p>Include a review for the Jaiye Says column</p>
      </div>
      <div class="col-md-12">
        <textarea v-model="event.review" class="form-control" style="height: 10em;"></textarea>
      </div>
      <div class="col-md-12 mt-3">
        <p>Add Events Tag</p>
      </div>
      <div class="col-md-12">
        <form class="form-inline my-3" onsubmit="return false">
          <select
            @change="event.tags.indexOf(tag) == -1 && tag!= -1 ? event.tags.push(tag): console.log('nah')"
            v-model="tag"
            class="form-control my-2 mr-3"
            style="width: 15em;"
          >
            <option value="-1">Click here to select</option>
            <option value="1">Nightlife</option>
            <option value="2">Cuisine</option>
            <option value="3">Music</option>
          </select>
          <button class="btn btn-lblue my-2" style="width: 6.5em; border: 1px solid #2b2a8d;">Save</button>
        </form>
      </div>
      <div class="col-md-12" v-if="event.tags.length > 0">
        <form class="form-inline my-3" onsubmit="return false">
          <label>Tags:</label>
          <button
            v-for="(tag,index) in event.tags"
            class="btn btn-purple mx-2 my-2"
            style="width: 7em;"
          >
            {{getTag(tag)}}
            <span @click="removeTag(index)">
              <i class="fas fa-times"></i>
            </span>
          </button>
          <!-- <button class="btn btn-purple mx-2 my-2" style="width: 7em;">Cuisine</button> -->
          <!-- <button class="btn btn-purple mx-//2 my-2" style="width: 7em;">Music</button> -->
        </form>
      </div>
      <div class="col-md-12">
        <div class="line my-4"></div>
      </div>
      <div class="col-md-12 mt-4">
        <form class="form-inline" onsubmit="return false">
          <button
            v-if="!loading && !event._id"
            class="btn btn-lblue my-2 mr-lg-2"
            style="width: 9em;"
            @click="$emit('finish',event)"
          >Save</button>
          <button
            v-if="!loading && event._id"
            class="btn btn-lblue my-2 mr-lg-2"
            style="width: 9em;"
            @click="$emit('finish',event)"
          >Update</button>
          <button
            v-if="loading"
            class="btn btn-lblue my-2 mr-lg-2"
            style="width: 9em;"
            disabled
          >saving...</button>
          <!-- <button class="btn btn-yellow mx-xs-0 my-2 mx-lg-2" style="width: 9em;"><a href="createnewevent3.html" >Continue</a></button> -->
          <button
            v-if="!loading"
            class="btn btn-red mx-xs-0 my-2 mx-lg-2"
            style="width: 9em;"
            @click="$emit('discard')"
          >Discard</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      tag: "",
    };
  },
  props:['loading'],
  computed:{
    ...mapGetters("event",{"event":"singleEvent"})

  },
  methods: {
    getTag(tag) {
      let meaning = "";
      if (tag == 1) {
        meaning = "Nightlife";
      } else if (tag == 2) {
        meaning = "Cuisine";
      } else if (tag == 3) {
        meaning = "Music";
      }
      return meaning;
    },
    removeTag(index) {
      this.event.tags.splice(index, 1);
      this.tag = "-1";
    }
  }
};
</script>

<style scoped>
.line {
  width: auto !important;
}
</style>
