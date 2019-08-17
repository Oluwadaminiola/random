<template>
  <div id="events">
    <div class="row">
      <div class="col-md-12">
        <div class="topbar">
          <img @click="$goBack()" :src="require('@/assets/img/Group (2).png')">&nbsp
          <b>CREATE NEW USER</b>
        </div>
      </div>
      <div class="col-md-10">
        <form onsubmit="return false">
          <input
            required
            v-model="email"
            class="form-control my-3"
            placeholder="e.g darangi@gmail.com"
            type="email"
          >
          <button v-if="loading" disabled class="btn btn-yellow" style="width: 7em;">creating...</button>
          
          <button v-else @click="createUser()" class="btn btn-yellow" style="width: 7em;">Create</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Api from "@/api/user";
export default {
  data() {
    return {
      email: "",
      loading: false
    };
  },
  methods: {
    createUser() {
      if (this.email) {
        this.loading = true;
        Api.createAdmin(this.email)
          .then((response) => {
            if(response.status){
            this.$notify({message:response.data,title:"Create user",type:"success"})
            this.$router.push({path:"/users"})
            }
            else
            this.$notify({message:response.response.data.message,title:"Create user",type:"error"})

            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    }
  }
};
</script>

