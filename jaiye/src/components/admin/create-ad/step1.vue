<template>
  <div class="formbod p-5">
    <p>AD Details</p>
    <form onsubmit="return false">
      <div class="form-group row">
        <div class="col-md-7">
          <label>Name</label>
          <input v-model="ad.name" type="text" class="form-control">
          <label>Duration</label>
          <div class="form-inline">
            <input type="text" v-model="ad.duration" class="form-control">
            <select class="form-control ml-2" @change="setDuration()" v-model="ad.durationType">
              <option value="days">Days</option>
              <option value="hours">Hours</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
            </select>
          </div>

          <label>Website</label>
          <input v-model="ad.website" type="text" class="form-control">
        </div>
        <div class="col-md-5">
          <label>Please Upload an Image</label>
          <a class="profile-pic">
            <div class="profile-pic" id="profile-pic">
              <img
                style="bottom:0"
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
          <label>Ad Description</label>
          <textarea v-model="ad.description" class="form-control" style="height: 5em;"></textarea>
        </div>
        <div class="col-md-12 mt-4">
          <form class="form-inline" onsubmit="return false">
            <button
              v-if="!loading && !ad._id"
              class="btn btn-lblue my-2 mr-lg-2"
              style="width: 9em;"
              @click="save(ad)"
            >Save</button>
            <button
              v-if="!loading && ad._id"
              class="btn btn-lblue my-2 mr-lg-2"
              style="width: 9em;"
              @click="update(ad)"
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
      ad: {
        name: "",
        website: "",
        duration: "",
        address: "",
        durationType: "",
        description: "",
        image: ""
      },
      loading: false
    };
  },
  computed: {
    ...mapGetters("ad", ["singleAd"])
  },
  mounted() {
    this.setImage(require("@/assets/img/img-2.jpg"));
    if (this.$route.query.ad) {
      this.getAd({ Id: this.$route.query.ad }).then(res => {
        this.ad = this.singleAd;
        // this.setImage(this.ad.image);
        $("#profile-pic").css(
          "background-image",
          "url(" + this.$setImage(this.ad.image_thumbnail) + ")"
        );
        localStorage.setItem("ad", JSON.stringify(this.ad));
      });
    }
  },
  methods: {
    ...mapActions("ad", ["createAd", "updateAd", "getAd"]),
    setBackgroundImage(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      this.ad.image = file.target.files[0];
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
      let data = this.ad;
      let fd = new FormData();
      for (let i in data) {
        fd.append(i, data[i]);
      }
      console.log(data);
      this.loading = true;
      this.createAd(fd)
        .then(res => {
          if (res.status) {
            this.$notify({
              message: `${data.name} created succesfully`,
              title: "New ad",
              type: "success"
            });
            this.$goBack();
            //   this.$clearLocalStorage("ad");
          } else {
            this.$notify({
              message: `failed to create ${data.name} ad`,
              title: "New ad",
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
    update(ad) {
      let data = this.ad;
      let fd = new FormData();
      for (let i in data) {
        fd.append(i, data[i]);
      }
      //   console.log(data)
      this.loading = true;
      this.updateAd({ fd, Id: ad._id })
        .then(res => {
          if (res.status) {
            this.$notify({
              message: `${data.name} updated succesfully`,
              title: "New ad",
              type: "success"
            });

            //   this.$clearLocalStorage("ad");
          } else {
            this.$notify({
              message: `failed to update ${data.name} ad`,
              title: "New ad",
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
    }
  }
};
</script>
<style scoped>
.btn-purple {
  /* padding:0px; */
}
</style>
