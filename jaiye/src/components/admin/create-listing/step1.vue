<template>
  <div class="formbod p-5">
    <p>Listing Details</p>
    <form onsubmit="return false">
      <div class="form-group row">
        <div class="col-md-7">
          <label>Business Name</label>
          <input v-model="listing.business_name" type="text" class="form-control">
          <label>Email Address</label>
          <input v-model="listing.email" type="email" class="form-control">
          <label>Contact Address</label>
          <input v-model="listing.address" type="text" class="form-control">
          <label>Contact Phone Number</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <img :src="require('@/assets/img/Group 2.png')">
              </span>
            </div>
            <input v-model="listing.phone" type="text" class="form-control">
          </div>

          <label>Website</label>
          <input v-model="listing.website" type="text" class="form-control">
          <label>Select Industry</label>
          <div class="form-inline">
            <select
              class="form-control my-2 mr-3"
              style="width: 18em;"
              v-model="industry"
            >
              <option value="-1">Click here to select</option>
              <option value="party">Party</option>
              <option value="conference">Conference</option>
              <option value="occassion">Occassion</option>
            </select>
            <button
              @change="listing.industry.indexOf(industry) == -1 && day!= -1 ? listing.industry.push(industry): console.log('nah')"
              class="btn btn-blue my-2"
            >Add</button>
          </div>
          <div class="col-md-12" v-if="listing.industry.length > 0">
            <form class="form-inline my-3">
              <label style="margin-top:0px !important">Industry:</label>
              <br>
              <button
                v-for="industry in listing.industry"
                class="btn btn-purple mx-2 my-2"
                style="width: 7em;"
              >{{industry}}</button>
              <!-- <button class="btn btn-purple mx-2 my-2" style="width: 7em;">Cuisine</button> -->
              <!-- <button class="btn btn-purple mx-//2 my-2" style="width: 7em;">Music</button> -->
            </form>
          </div>
          <label>Select Hours</label>
          <div class="form-inline w-100">
            <div class="row">
              <div class="col-md-6">
                <el-time-select v-model="listing.opening_time" placeholder="Opening time"></el-time-select>
              </div>
              <div class="col-md-6">
                <el-time-select v-model="listing.closing_time" placeholder="Closing time"></el-time-select>
              </div>
            </div>
          </div>
          <label>Select Business Days</label>
          <div class="form-inline">
            <select
              class="form-control mr-3"
              style="width: 10em;"
              v-model="day"
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
              @click="listing.business_days.indexOf(day) == -1 && day!= -1 ? listing.business_days.push(day): ''"
              class="btn btn-blue"
            >Add</button>
          </div>
          <div class="col-md-12" v-if="listing.business_days.length > 0">
            <form class="form-inline my-3">
              <label style="margin-top:0px !important">Business Days:</label>
              <br>
              <button
                v-for="day in listing.business_days"
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
              @click="listing.tags.indexOf(tag) == -1 && tag!= -1 ? listing.tags.push(tag): ''"
              class="btn btn-yellow my-2"
            >Add</button>
          </div>
          <div class="col-md-12" v-if="listing.tags.length > 0">
            <form class="form-inline my-3">
              <label style="margin-top:0px !important">Tags:</label>
              <br>
              <button
                v-for="tag in listing.tags"
                class="btn btn-purple mx-2 my-2"
                style="width: 7em;"
              >{{$getTag(tag)}}</button>
              <!-- <button class="btn btn-purple mx-2 my-2" style="width: 7em;">Cuisine</button> -->
              <!-- <button class="btn btn-purple mx-//2 my-2" style="width: 7em;">Music</button> -->
            </form>
          </div>
        </div>

        <div class="col-md-5">
          <label>Please Upload the Business Image</label>
          <a class="profile-pic">
            <div class="profile-pic" id="profile-pic">
              <img
                style="top:200px!important"
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
          <label>Business Description</label>
          <textarea v-model="listing.description" class="form-control" style="height: 5em;"></textarea>
        </div>
        <div class="col-md-12 mt-4">
          <form class="form-inline" onsubmit="return false">
            <button
              class="btn btn-lblue my-2 mr-lg-2"
              style="width: 9em;"
              @click="save()"
              v-if="!loading && !listing._id"
            >Save</button>
            <button
              class="btn btn-lblue my-2 mr-lg-2"
              style="width: 9em;"
              @click="update()"
              v-if="!loading && listing._id"
            >Update</button>
            <button
              class="btn btn-lblue my-2 mr-lg-2"
              style="width: 9em;"
              v-if="loading"
              disabled
            >Saving...</button>
            <button
              v-if="!loading"
              class="btn btn-red mx-xs-0 my-2 mx-lg-2"
              @click="$goBack()"
              style="width: 9em;"
            >Discard</button>
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
      listing: {
        tags: [],
        business_days: [],
        industry: [],
        business_name: "",
        description: "",
        opening_time: "",
        closing_time: "",
        image: "",
        email: "",
        phone: "",
        address: "",
        website: ""
      },
      tag: "-1",
      day: "-1",
      industry: "",
      loading: false,

      style: {
        "background-image": require("@/assets/img/img-2.jpg")
      }
    };
  },
  mounted() {
    this.setImage(require("@/assets/img/img-2.jpg"));

    if (this.$route.query.listing) {
      this.getListing({ Id: this.$route.query.listing }).then(res => {
        this.listing = this.singleListing;
        this.setImage(this.$setImage(this.listing.image_thumbnail));
        localStorage.setItem("listing", JSON.stringify(this.listing));
      });
    }
  },
  computed: {
    ...mapGetters("listing", ["singleListing"])
  },
  methods: {
    ...mapActions("listing", ["createListing", "updateListing", "getListing"]),
    openSelector() {
      $("#image").click();
    },
    setImage(url) {
      $("#profile-pic").css("background-image", "url(" + url + ")");
    },
    save(event) {
      let data = this.listing;
      let fd = new FormData();
      for (let i in data) {
        fd.append(i, data[i]);
      }
      console.log(data);
      this.loading = true;
      this.createListing(fd)
        .then(res => {
          if (res.status) {
            this.$notify({
              message: `${data.business_name}'s listing saved succesfully`,
              title: "New Listing",
              type: "success"
            });
            this.$goBack();
            //   this.$clearLocalStorage("event");
          } else {
            this.$notify({
              message: `Failed to save ${data.business_name}'s listing`,
              title: "New Listing",
              type: "error"
            });
          }
          this.loading = false;
          // console/log(fd,"1234")
        })
        .catch(err => {
          this.loading = false;
          // console.log(err)
        });
    },
    update() {
      let data = this.listing;
      let fd = new FormData();
      for (let i in data) {
        fd.append(i, data[i]);
      }
      //   console.log(data)
      this.loading = true;
      this.updateListing({ fd, Id: data._id })
        .then(res => {
          if (res.status) {
            //   this.$clearLocalStorage("event");
            this.$notify({
              message: `${data.business_name}'s listing updated succesfully`,
              title: "Update Listing",
              type: "success"
            });
          } else {
            this.$notify({
              message: `failed to update ${data.business_name}'s listing`,
              title: "Update Listing",
              type: "error"
            });
          }
          this.loading = false;
          // console/log(fd,"1234")
        })
        .catch(err => {
          this.loading = false;
          // console.log(err)
        });
    },
    setBackgroundImage(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      this.listing.image = file.target.files[0];
      reader.onload = function(e) {
        $("#profile-pic").css(
          "background-image",
          "url(" + e.target.result + ")"
        );
      };
    }
  }
};
</script>
<style scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: auto;
}
.col-md-6 {
  margin: 0px;
}
.btn-purple {
  /* padding:0px; */
}
</style>
