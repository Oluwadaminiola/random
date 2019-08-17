<template>
  <div class="formbod p-5">
    <p>Events Details</p>
    <div class="form-group row">
      <div class="col-md-12">
        <p>Add the date and time information. If an event has numerous
          <br>showing times, you can use the ‘add’ fuction to enter more dates.
        </p>
      </div>
      <div class="col-md-12">
        <button
          @click.stop="event.showing_time.push({date:'',closing_time:'',opening_time:''})"
          class="btn btn-blue"
          style="color: white"
        >Add Date & Time</button>
      </div>
      <div class="row" v-for="(event_dates,index) in event.showing_time">
        <div class="col-md-3">
          <label>{{index+ 1}}. Date</label>
          <el-date-picker
            v-model="event.showing_time[index].date"
            type="date"
            placeholder="Pick a date"
          ></el-date-picker>
          <!-- <input class="form-control" v-model="event.showing_time[index].date" type="text"> -->
        </div>
        <div class="col-md-3">
          <label>Opening Time</label>
          <el-time-select
            v-model="event.showing_time[index].opening_time"
            placeholder="Opening time"
          ></el-time-select>

          <!-- <input 
           onfocus="(this.type='time')"
              placeholder="pick a time"
              style="margin-right:2px;display:inline"
              type="text"
              class="form-control"
             v-model="event.showing_time[index].opening_time"

          >-->
          <!-- <el-date-picker
            v-model="event.showing_time[index].closing_time"
            type="datetime"
            placeholder="Pick a date"
          ></el-date-picker>-->
          <!-- <input class="form-control"  type="text"> -->
        </div>
        <div class="col-md-3">
          <label>Closing Time</label>
          <el-time-select
            v-model="event.showing_time[index].closing_time"
            placeholder="Closing time"
          ></el-time-select>

          <!-- <input class="form-control" type="text"> -->
        </div>
        <div class="col-md-3">
          <label style="color:white;display:block;
            margin-bottom:0!important">crazy</label>

          <!-- <br> -->
          <button
            @click.stop="event.showing_time.splice(index,1)"
            class="btn btn-red my-2 mx-xs-0 mx-lg-2"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div class="col-md-12 mt-4">
        <form class="form-inline" onsubmit="return false">
          <button
            v-if="loading"
            class="btn btn-lblue my-2 mr-lg-2"
            style="width: 9em;"
            disabled
          >updating</button>
          <button
            v-else
            @click="$emit('active','3',event)"
            class="btn btn-yellow my-2 mx-xs-0 mx-lg-2"
            style="width: 9em;"
          >Continue</button>
          <button @click="$emit('discard')" class="btn btn-red my-2 mx-xs-0 mx-lg-2" style="width: 9em;">Discard</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  props: ["loading"],
  mounted(){
    Array.isArray(this.event.showing_time) ? this.event.showing_time : this.event.showing_time = JSON.parse(this.event.showing_time)
  },
  computed: {
    ...mapGetters("event", { event: "singleEvent" })
  },
  methods: {}
};
</script>
<style scoped>
.my-close-btn {
  position: absolute;
  top: 250px;
  right: 25px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: auto !important;
}
</style>
