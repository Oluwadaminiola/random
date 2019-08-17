<template>
  <div id="events">
    <div class="row">
      <div class="col-md-12">
        <div class="topbar">
          <img @click="goBack()" :src="require('@/assets/img/Group (2).png')">&nbsp
          <b v-if="$route.query.event">EDIT EVENT</b>
          <b v-else>CREATE NEW EVENT</b>
        </div>
      </div>
      <div class="col-md-10">
        <step1 @discard="discard" v-if="active == 1" @active="setActive" :event="event"></step1>
        <step2 @discard="discard" v-if="active == 2" @active="setActive" :event="event"></step2>
        <step3
          @discard="discard"
          v-if="active == 3"
          @active="setActive"
          @finish="finish"
          :loading="loading"
        ></step3>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import Api from "@/api/events";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
export default {
  components: { Step1, Step2, Step3 },
  data() {
    return {
      active: "1",
      event: {},
      loading: false
    };
  },
  computed: {
    ...mapGetters("event", ["singleEvent"])
  },
  mounted() {
    if (this.$route.query.event) {
      this.getEvent({ Id: this.$route.query.event }).then(res => {
        this.event = this.singleEvent;
      });
    }
  },
  methods: {
    ...mapActions("event", ["getEvent", "createEvent", "clearEvent"]),
    setActive(active) {
      this.active = active;
    },
    goBack() {
      this.active - 1 > 0
        ? (this.active = this.active - 1)
        : this.clearGoBack();
    },
    discard() {
      this.clearEvent();
      this.$goBack();
    },
    clearGoBack() {
      this.clearEvent();
      this.$goBack();
    },
    finish(event) {
      let Id = event._id;
      let fd = new FormData();
      let API = Api.create;
      if (Id) {
        delete event._id;
        API = Api.update;
      }
      for (let i in event) {
        if (i == "showing_time") {
          event[i] = JSON.stringify(event[i]);
        }
        fd.append(i, event[i]);
      }
      this.loading = true;
      API({ fd, Id }).then(res => {
        if (res.status) {
          this.$notify({
            message: Id ? "updated successfully" : "created succesfully",
            type: "success"
          });
        } else {
          this.$notify({ message: res.message, type: "error" });
        }
        this.loading = false;

        this.$goBack();
      });

      console.log(event, "yolo");
    }
  }
};
</script>
