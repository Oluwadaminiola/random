<template>
  <table class="col-md-12">
    <thead style="padding: 1em; margin-bottom: +1em;">
      <tr>
        <th>
          <!-- <input type="checkbox"> -->
        </th>
        <th>No</th>
        <th>Event Name</th>
        <th>Venue Name</th>
        <th>Price</th>
        <th>Date Created</th>
        <th>Date</th>
        <th>Number</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <!-- {{canOnlyActivate}}{{canOnlyDeactivate}} -->
    <tbody class="mt-5">
      <tr
        v-for="(event,index) in events"
        class="py-2"
        style="padding: 1em !important; margin-top: +1em;"
      >
        <td>
          <input type="checkbox" @click="checkMe(event._id)" v-model="checkedEvents[event._id]">
        </td>
        <td>{{index+1}}</td>
        <td>{{event.event_name}}</td>
        <td>{{event.address}}</td>
        <td>{{$formatCurrency(event.price)}}</td>
        <td>{{$formatDate(event.created_time)}}</td>
        <td>{{$formatDate(event.event_date)}}</td>
        <td>{{event.phone}}</td>
        <td>
          <button class="btn btn-yellow" style="width: 6.5em;" @click="view(event)">View</button>
        </td>
        <td v-if="status === Helper.status.running && !isBestThing">
          <button class="btn btn-red" @click="discard(event)" style="width: 6.5em;">Discard</button>
        </td>
        <td
          v-if="(status === Helper.status.request || status == Helper.status.archived) && !isBestThing"
        >
          <button class="btn btn-blue" @click.stop="$emit('show','accept',event)">
            <i class="fas fa-check"></i>
          </button>
        </td>
        <td v-if="status === Helper.status.request && !isBestThing">
          <button class="btn btn-red" @click.stop="$emit('show','discard',event)">
            <i class="fas fa-times"></i>
          </button>
        </td>
        <td v-if="status == Helper.status.archived && !isBestThing">
          <button class="btn btn-red" @click.stop="discard(event)">
            <i class="fas fa-times"></i>
          </button>
        </td>
        <td v-if="isBestThing && event.isBestThing">
          <button :disabled="canOnlyActivate" class="btn btn-red" @click.stop="deactivate(event)">
            <!-- <i class="fas fa-times"></i> -->
            Deactivate
          </button>
        </td>
        <td v-if="isBestThing && !event.isBestThing">
          <button :disabled="canOnlyDeactivate" class="btn btn-blue" @click.stop="activate(event)">
            <!-- <i class="fas fa-times"></i> -->
            Activate
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import Helper from "@/helpers/myhelper";
import Api from "@/api/events";
const self = this;
export default {
  mounted() {
    this.$router.history.current.path == "/bestthings"
      ? (this.isBestThing = true)
      : (this.isBestThing = false);
  },
  data() {
    return {
      Helper: Helper,
      checkedEvents: [],
      isBestThing: false,
      canOnlyDeactivate:false,
      canOnlyActivate:false,
    };
  },
  watch:{
      checkedEvents:(e)=>{
         return;
         if(e.length > 1){
              let event = this.events.find(ev => ev._id == e[0]);
              console.log(event,"dsdsd")
              if(event.isBestThing){
                  self.canOnlyDeactivate = true;
              }
              else{
                  self.canOnlyActivate = true;
              }
          }
      }
  },
  props: ["status"],
  created() {},
  computed: {
    ...mapGetters("event", ["events"])
  },
  methods: {
    checkMe(id) {
      !this.checkedEvents.includes(id)
        ? this.checkedEvents.push(id)
        : this.checkedEvents.splice(this.checkedEvents.indexOf(id));
        return;
         if(this.checkedEvents.length == 1){
              let event = this.events.find(ev => ev._id == this.checkedEvents[0]._id);
              if(event.isBestThing){
                  self.canOnlyDeactivate = true;
              }
              else{
                  self.canOnlyActivate = true;
              }
          }
    },
    discard(event) {
      let context = this;
      this.$confirm(
        "Do you want to discard this event? " + event.event_name + ""
      ).then(res => {
        context.$emit("discard", event._id);
      });
    },
    onAtATime() {
      let active = this.checkedEvents.filter(e => e.isBestThing);
      let inactive = this.checkedEvents.filter(e => !e.isBestThing);
      console.log(active.length,inactive.length)
      active.length > 0 && inactive.length > 0
        ? this.$notify({
            message: "Sorry,you can only activate/deactivate events as a group not at the same time",
            title: "Action",
            type: "error"
          })
        : console.log("123");
    },
    deactivate(event) {
      if (this.checkedEvents.indexOf(event._id) == -1)
        this.checkedEvents.push(event._id);

      this.checkedEvents.push(event._id);
      let unique = [...new Set(this.checkedEvents)];
      this.checkedEvents = unique;
      this.onAtATime();
      let context = this;
      this.$confirm(
        "Do you want to deactivate " +
          this.checkedEvents.length +
          " events from best thing(s)?"
      ).then(res => {
        this.$notify({ message: "removing from best things...", type: "info" });

        Api.createBestThings({
          bestThings: this.checkedEvents,
          action: "deactivate"
        }).then(res => {
          this.$notify({
            message:
              "" + this.checkedEvents.length + " events removed from best things",
            type: "success"
          });
         this.reset()

        });
        // context.$emit("discard", event._id);
      });
    },
    activate(event) {
      if (this.checkedEvents.indexOf(event._id) == -1)
        this.checkedEvents.push(event._id);
      let context = this;
      this.onAtATime();

      this.$confirm(
        "Do you want to activate " +
          this.checkedEvents.length +
          " as  best thing(s) in lagos?"
      ).then(res => {
        this.$notify({ message: "adding events to best things...", type: "info" });
        Api.createBestThings({
          bestThings: this.checkedEvents,
          action: "activate"
        }).then(res => {
          this.$notify({
            message: "" + this.checkedEvents.length + "events added to best things",
            type: "success"
          });
          this.reset()
        });
      });
    },
    reset(){
          this.checkedEvents = [];
          this.canOnlyDeactivate = false;
          this.canOnlyActivate = false;
          this.$emit("refresh")
    },
    view(event) {
      this.$router.push({ path: "/event/create", query: { event: event._id } });
    }
  }
};
</script>
<style scoped>
.btn-blue{
    width: 100% !important;
}
</style>
