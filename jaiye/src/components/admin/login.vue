<template>
  <div class="signbod">
    <nav class="signnav navbar navbar-default">
      <a class="navbar-brand">
        <img :src="require('@/assets/img/Group.png')">
      </a>
    </nav>
    <div class="container-fluid">
      <div class="row mt-5">
        <div class="col-md-3 d-none d-md-block"></div>
        <div v-if="token" class="col-md-6 p-5">
          <div class="signcard p-5">
            {{errors}}
            <form onsubmit="return false">
              <label>First Name</label>
              <input
                name="first"
                v-validate="'required'"
                v-model="user.firstname"
                type="text"
                class="form-control"
              >
              <span class="error" v-if="errors.has('first')">First name is required</span>
              <label>Last Name</label>
              <input
                name="last"
                v-validate="'required'"
                v-model="user.lastname"
                type="text"
                class="form-control"
              >
              <span class="error" v-if="errors.has('last')">Last name is required</span>
              <label>Email Address</label>
              <input
                name="email"
                v-validate="'required|email'"
                v-model="user.email"
                type="email"
                class="form-control"
                :readonly="token"
              >
              <span class="error" v-if="errors.has('email')">Enter a valid email address</span>
              <label>Create your password</label>
              <input
                v-validate="'required'"
                v-model="user.password"
                name="mypassword"
                type="password"
                class="form-control"
              >
              <span class="error" v-if="errors.has('mypassword')">Enter your password</span>

              <p class="text-center mt-4" v-if="token">
                <button v-if="loading" disabled class="btn m-auto" style="width: 8em;">
                  Signing up
                  <i class="fas fa-spin fa-spinner"></i>
                </button>
                <button v-else @click.stop="signup()" class="btn m-auto" style="width: 8em;">Sign up</button>
              </p>
              <p class="text-center mt-4" v-else>
                <button v-if="loading" disabled class="btn m-auto" style="width: 8em;">
                  Logging In
                  <i class="fas fa-spin fa-spinner"></i>
                </button>
                <button v-else @click.stop="signup()" class="btn m-auto" style="width: 8em;">Log In</button>
              </p>
              <p class="text-center">
                <!-- <a href="#" >Forgot your password?</a> -->
              </p>
            </form>
          </div>
        </div>
        <div v-else class="col-md-6 p-5">
          <div class="signcard p-5">
            <form onsubmit="return false">
              <label>Email Address</label>
              <input
                name="email"
                v-validate="'required|email'"
                v-model="user.email"
                type="email"
                class="form-control"
              >
              <span class="error" v-if="errors.has('email')">Enter a valid email address</span>
              <label>Enter your password</label>
              <input
                v-validate="'required'"
                v-model="user.password"
                name="password"
                type="password"
                class="form-control"
              >
              <span class="error" v-if="errors.has('password')">Enter your password</span>

              <p class="text-center mt-4">
                <button v-if="loading" disabled class="btn m-auto" style="width: 8em;">
                  Logging In
                  <i class="fas fa-spin fa-spinner"></i>
                </button>
                <button v-else @click.stop="verify()" class="btn m-auto" style="width: 8em;">Log In</button>
              </p>
              <p class="text-center">
                <!-- <a href="#" >Forgot your password?</a> -->
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import Api from "@/api/user";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        firstname: "",
        lastname: ""
      },
      token: "",
      loading: false
    };
  },
  mounted() {
    if (this.$route.query.token) {
      this.token = this.$route.query.token;
      this.getUserData();
    }
  },
  methods: {
    ...mapActions("auth", ["login"]),
    getUserData() {
      Api.getAdminData(this.token)
        .then(res => {
          if (res.status) this.user = res.data;
          else this.$notify({ message: "invalid link", type: "error" });
        })
        .catch(err => {});
    },
    verify() {
      let self = this;
      this.$validator.validate().then(result => {
        if (result) {
        this.loading = true;
        this.login(this.user).then(response => {
          this.loading = false;
          if (response.status) {
            self.$router.push({ path: "/dashboard" });
          }
        });
        }
      });
    },
    signup() {
      let self = this;
      this.$validator.validate().then(result => {
        // if (this.result) {
          // return;
          this.loading = true;
          this.user.first_name = this.user.firstname;
          this.user.last_name = this.user.lastname;
          Api.signup(this.user).then(response => {
            this.loading = false;
            if (response.status) {
              self.$notify({
                message: "Registration completed! login to jaiye",
                type: "success"
              });
              self.token = "";
            }
          });
        // }
      });
    }
  }
};
</script>
<style scoped>
.error {
  color: red;
  display: block;
  margin: 5px;
  text-align: center;
  font-size: 12px;
}
</style>

