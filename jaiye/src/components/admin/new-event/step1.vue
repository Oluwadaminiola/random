<template>
  <div class="formbod p-5">
    <p>Events Details</p>
    <form onsubmit="return false">
      <div class="form-group row">
        <div class="col-md-7">
          <label>Event Title</label>
          <input v-model="event.event_name" type="text" class="form-control">
          <label>Venue Name</label>
          <input v-model="event.venue_name" type="text" class="form-control">
          <label>Address</label>
          <input v-model="event.address" type="text" class="form-control">
          <label>Contact Phone Number</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <img :src="require('@/assets/img/Group 2.png')">
              </span>
            </div>
            <input type="text" v-model="event.phone" class="form-control">
          </div>

          <label>Contact Email Address</label>
          <input type="email" v-model="event.email" class="form-control">
        </div>
        <div class="col-md-5">
          <label>Please Upload the Events Image</label>
          <input type="file" hidden id="image" @change="setBackgroundImage">
          <a class="profile-pic">
            <div class="profile-pic" id="profile-pic" :style="style" >
              <img @click="openSelector()" :src="require('@/assets/img/Camera.png')" width="50" height="50" class="camera" alt="">
              <!-- <span class="glyphicon glyphicon-camera"></span> -->
              <!-- <span>Change Image</span> -->
            </div>
          </a>
          <label class="mt-5">Price</label>
          <input type="number" v-model="event.price" class="form-control">
          <label>Event Category</label>
          <select v-model="event.category" class="form-control">
            <option>Party</option>
            <option>Conference</option>
            <option>Occassion</option>
          </select>
        </div>
        <div class="col-md-4">
          <label>Event Date</label>
          <el-date-picker v-model="event.event_date" type="date" placeholder="Pick a date"></el-date-picker>
          <!-- <input v-model="event.event_date" type="date" class="form-control"> -->
        </div>
        <div class="col-md-8">
          <label>Event Website</label>
          <input type="url" v-model="event.website" class="form-control">
        </div>
        <div class="col-md-12">
          <label>Event Description</label>
          <textarea v-model="event.description" class="form-control" style="height: 5em;"></textarea>
        </div>
        <div v-if="loading" class="col-md-12 mt-4">
          <button class="btn btn-lblue my-2 mr-lg-2" style="width: 9em;" disabled>loading</button>
        </div>

        <div v-else class="col-md-12 mt-4">
          <form class="form-inline" onsubmit="return false">
            <button
              v-if="event._id"
              @click="$emit('active','2',event)"
              class="btn btn-lblue my-2 mr-lg-2"
              style="width: 9em;"
            >Update</button>
            <button
              v-else
              @click="$emit('active','2',event)"
              class="btn btn-lblue my-2 mr-lg-2"
              style="width: 9em;"
            >Save</button>
            <button
              @click="$emit('active','2',event)"
              class="btn btn-yellow mx-xs-0 my-2 mx-lg-2"
              style="width: 9em;"
            >Continue</button>
            <button @click="$emit('discard')" class="btn btn-red mx-xs-0 my-2 mx-lg-2" style="width: 9em;">Discard</button>
          </form>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: false,
      style: {
        "background-url": require("@/assets/img/img-2.jpg")
      }
    };
  },
  computed: {
    ...mapGetters("event",{"event":"singleEvent"})

  },
  mounted(){
    if(this.event.image){
      this.setBackgroundImage(this.event.image)
    }
    else{
      this.setImage(require("@/assets/img/img-2.jpg"));
    }
    if(this.event.image_thumbnail){
      this.setImage(this.$setImage(this.event.image_thumbnail))
    }
  },
  methods: {
    setBackgroundImage(file) {
      let reader = new FileReader();
      file = file.target ? file.target.files[0] : file;
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.event.image = file;
        this.setImage(e.target.result);
      };
    },
    setImage(url) {
      $("#profile-pic").css("background-image", "url(" + url + ")");
    },
    openSelector() {
      $("#image").click();
    }
  }
};
</script>
