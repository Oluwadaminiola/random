<template>
  <div>
   <span>From </span> <el-date-picker v-model="from" type="date" placeholder="Select date"></el-date-picker>
    <span>To </span> <el-date-picker v-model="to" type="date" placeholder="Select date"></el-date-picker>
    <button @click="emitDateRange()" class="btn btn-blue mb-2" style="width: 9.5em;">Search</button>
    &nbsp;&nbsp;&nbsp;&nbsp;
      <i @click="clear()" v-if="refresh !==''" style="cursor:pointer" title="refresh data" class="fas fa-sync-alt"></i>

  </div>
</template>
<script>
export default {
  props:["refresh"],
  data() {
    return {
      from: "",
      to: ""
    };
  },
  mounted() {
  },
  methods:{
    emitDateRange(){
     new Date(this.from).getTime() < new Date(this.to).getTime() 
     ? this.$emit('daterange',{from: new Date(this.from).toISOString(),to: new Date(this.to).toISOString()})
     : this.$notify({type:'error',title:'Date range',message:'Range is invalid/empty'})
     
    },
    clear(){
      this.from = "";
     this.to = "";
     this.$emit("refresh")
    }
  }
};
</script>
<style scoped>
button{
  margin-top: 5px;
}
</style>


