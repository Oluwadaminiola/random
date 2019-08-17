<template>
  <div class="formbod p-5">
    <p>Attraction Details</p>
    <form onsubmit="return false">
      <div class="form-group row">
        <div class="col-md-7">
          <label>Attraction Name</label>
          <input v-model="attraction.name" type="text" class="form-control">
          <label>Address</label>
          <input v-model="attraction.address" type="email" class="form-control">
          <label>Price</label>
          <input v-model="attraction.price" type="text" class="form-control">
          <label>Contact Phone Number</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <img :src="require('@/assets/img/Group 2.png')">
              </span>
            </div>
            <input v-model="attraction.phone" type="text" class="form-control">
          </div>

          <label>Website</label>
          <input v-model="attraction.website" type="text" class="form-control">
          <label>Select Hours</label>
          <!-- <div class="form-inline w-100"> -->
          <div class="row">
            <div class="col md-6">
              <el-time-select v-model="attraction.opening_hour" placeholder="Opening time"></el-time-select>
            </div>
            <div class="col md-6">
              <el-time-select v-model="attraction.closing_hour" placeholder="Closing time"></el-time-select>
            </div>
            <!-- </div> -->
            <!-- <select class="form-control my-2 mr-3" style="width: 10em; ">
                                                            <option>Opening Time</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
            </select>-->
            <!-- <select class="form-control my-2 " style="width: 10em; ">
                                                                <option>Closing Time</option>
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
            </select>-->
          </div>
          <label>Select Business Days</label>
          <div class="form-inline">
            <select
              class="form-control mr-3"
              style="width: 10em;"
              v-model="day"
              @change="attraction.business_days.indexOf(day) == -1 && day!= -1 ? attraction.business_days.push(day): console.log('nah')"
            >
              <option value="-1">--business day--</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
            <button
              @click="attraction.business_days.indexOf(day) == -1 && day!= -1 ? attraction.business_days.push(day): console.log('nah')"
              class="btn btn-blue"
            >Add</button>
          </div>
          <div
            class="col-md-12"
            v-if="attraction.business_days && attraction.business_days.length > 0"
          >
            <form class="form-inline my-3">
              <label style="margin-top:0px !important">Business Days:</label>
              <br>
              <button
                v-for="day in attraction.business_days"
                class="btn btn-purple mx-2 my-2"
                style="width: 7em;"
              >{{day}}</button>
              <!-- <button class="btn btn-purple mx-2 my-2" style="width: 7em;">Cuisine</button> -->
              <!-- <button class="btn btn-purple mx-//2 my-2" style="width: 7em;">Music</button> -->
            </form>
          </div>
          <label>Add Tags</label>
          <div class="form-inline">
            <select
              @change="attraction.tags.indexOf(tag) == -1 && tag!= -1 ? attraction.tags.push(tag): console.log('nah')"
              v-model="tag"
              class="form-control my-2 mr-3"
              style="width: 15em;"
            >
              <option value="-1">Click here to select</option>
              <option value="1">Nightlife</option>
              <option value="2">Cuisine</option>
              <option value="3">Music</option>
            </select>
            
            <button
              @click="attraction.tags.indexOf(tag) == -1 && tag!= -1 ? attraction.tags.push(tag): console.log('nah')"
              class="btn btn-yellow my-2"
            >Add</button>
          </div>
          <div class="col-md-12" v-if="attraction.tags && attraction.tags.length > 0">
            <form class="form-inline my-3">
              <label style="margin-top:0px !important">Tags:</label>
              <br>
              <button
                v-for="tag in attraction.tags"
                class="btn btn-purple mx-2 my-2"
                style="width: 7em;"
              >{{$getTag(tag)}}</button>
              <!-- <button class="btn btn-purple mx-2 my-2" style="width: 7em;">Cuisine</button> -->
              <!-- <button class="btn btn-purple mx-//2 my-2" style="width: 7em;">Music</button> -->
            </form>
          </div>
        </div>

        <div class="col-md-5">
          <label>Please Upload the Attraction Image</label>
          <a class="profile-pic">
            <div class="profile-pic" id="profile-pic">
              <img
                style="top:200px"
                @click="openSelector()"
                :src="require('@/assets/img/Camera.png')"
                width="50"
                height="50"
                class="camera"
                alt
              >

              <!-- <span class="glyphicon glyphicon-camera"></span> -->
              <!-- <span>Change Image</span> -->
            </div>
          </a>
          <input @change="setBackgroundImage" type="file" id="image" hidden>
          <!-- <button @click="openSelector()" class="btn btn-blue" style="width: 9em;">Add Image</button> -->
        </div>

        <div class="col-md-12">
          <label>Attraction Description</label>
          <textarea v-model="attraction.description" class="form-control" style="height: 5em;"></textarea>
        </div>
        <div class="col-md-12 mt-4">
          <form class="form-inline" onsubmit="return false">
            <button
              v-if="!loading && !attraction._id"
              class="btn btn-lblue my-2 mr-lg-2"
              style="width: 9em;"
              @click="save(attraction)"
            >Save</button>
            <button
              v-if="!loading && attraction._id"
              class="btn btn-lblue my-2 mr-lg-2"
              style="width: 9em;"
              @click="update(attraction)"
            >Update</button>
            <button
              v-if="loading"
              class="btn btn-lblue my-2 mr-lg-2"
              style="width: 9em;"
              disabled
            >saving...</button>
            <!-- <button
              class="btn btn-yellow mx-xs-0 my-2 mx-lg-2"
              style="width: 9em;"
              @click="$continue(listing,'/listing/create/step2',true)"
            >Continue</button>-->
            <button class="btn btn-red mx-xs-0 my-2 mx-lg-2" style="width: 9em;">Discard</button>
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
      attraction: {
        name: "",
        tags: [],
        business_days: [],
        price: "",
        website: "",
        phone: "",
        address: "",
        description: "",
        image: "",
        opening_hour: "",
        closing_hour: ""
      },
      loading: false,
      tag: "",
      day: "",
      industry: "",
      style: {
        "background-image": this.$defaultImage()
      }
    };
  },
  computed: {
    ...mapGetters("attraction", ["singleAttraction"])
  },
  created() {
    this.setImage(require("@/assets/img/img-2.jpg"));

    if (this.$route.query.attraction) {
      this.getAttraction({ Id: this.$route.query.attraction }).then(res => {
        console.log(this.singleAttraction);
        this.attraction = this.singleAttraction;
        this.attraction.image = this.$setImage(this.attraction.image_thumbnail);
        $("#profile-pic").css(
          "background-image",
          "url(" + this.attraction.image + ")"
        );
        localStorage.setItem("attraction", JSON.stringify(this.attraction));
      });
    }
  },
  methods: {
    ...mapActions("attraction", [
      "createAttraction",
      "updateAttraction",
      "getAttraction"
    ]),
    setBackgroundImage(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      this.attraction.image = file.target.files[0];
      reader.onload = function(e) {
        $("#profile-pic").css(
          "background-image",
          "url(" + e.target.result + ")"
        );
      };
    },
    openSelector() {
      $("#image").click();
    },
    save() {
      let data = this.attraction;
      let fd = new FormData();
      for (let i in data) {
        fd.append(i, data[i]);
      }
      console.log(data);
      this.loading = true;
      this.createAttraction(fd)
        .then(res => {
          if (res.status) {
            this.$clearLocalStorage("attraction");
            this.$notify({
              title: "New attraction",
              message: `${this.attraction.name} created successfully`,
              type: "success"
            });
            this.$goBack();
          } else {
            this.$notify({
              title: "New attraction",
              message: `failed to create ${this.attraction.name} attraction`,
              type: "error"
            });
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    update(attraction) {
      let data = this.attraction;
      let fd = new FormData();
      for (let i in data) {
        fd.append(i, data[i]);
      }
      //   console.log(data)
      this.loading = true;
      this.updateAttraction({ fd, Id: attraction._id })
        .then(res => {
          if (res.status) {
            this.$clearLocalStorage("attraction");
            this.$notify({
              title: "Update attraction",
              message: `${this.attraction.name} updated successfully`,
              type: "success"
            });
            this.$goBack();
          } else {
            this.$notify({
              title: "Update attraction",
              message: `failed to update ${this.attraction.name} attraction`,
              type: "error"
            });
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
</script>
<style scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: auto !important;
}
</style>
