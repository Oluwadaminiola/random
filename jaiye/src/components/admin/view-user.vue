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
        <div class="viewbod p-5">
          <div class="row">
            <div class="col-md-7">
              <div class="row">
                <div class="col-xs-6 gg">
                  <p>FIRST NAME</p>
                  <p>LAST NAME</p>
                  <p>DATE CREATED:</p>
                  <p>CREATOR:</p>
                  <p>LAST LOGIN:</p>
                  <p>STATUS:</p>
                </div>
                <div class="col-xs-6 bb">
                  <p>{{user.first_name || "-"}}</p>
                  <p>{{user.last_name || "-"}}</p>
                  <p>{{$formatDate(user.created_time)}}</p>
                  <p>{{$formatName(user)}}</p>
                  <p>{{$formatDate(user.last_login)}}</p>
                  <p>{{user.status == "1" ? "ACTIVE" : "SUSPENDED"}}</p>
                </div>
              </div>
            </div>
            <div class="col-md-5">
              <a href="#" class="profile-pic2">
                <div class="profile-pic2" style="background: url('../img/img-2.jpg') ">
                  <span class="glyphicon glyphicon-camera"></span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Api from '@/api/user'
export default {
  data(){
    return{
      user:{}
    }
  },
  mounted(){
    this.getUser();
  },
  methods:{
    getUser(){
      this.$route.query.user ? 
      Api.get({Id:this.$route.query.user}).then(res=>{
        console.log(res)
       res.status ?  this.user = res.data :this.$notify({message:res.response.message,type:"error",title:"error"})
      })
      .catch(()=>{

      })
      :
      this.$notify({message:"No user id provided",type:"error",title:"User data"})
    }
  }
  
}
</script>

