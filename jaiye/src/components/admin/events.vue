<template>
  <div id="events">
    <ul class="nav nav-tabs">
      <li
        class="px-3 py-2"
        :class="{'active':active == Helper.status.running}"
        @click="setActive(Helper.status.running)"
      >
        <a data-toggle="tab">Running</a>
      </li>
      <li
        class="px-3 py-2"
        :class="{'active':active == Helper.status.archived}"
        @click="setActive(Helper.status.archived)"
      >
        <a data-toggle="tab">Archived</a>
      </li>
      <li
        class="px-3 py-2"
        :class="{'active':active == Helper.status.request}"
        @click="setActive(Helper.status.request)"
      >
        <a data-toggle="tab">Requests</a>
      </li>
    </ul>

    <div class="tab-content">
      <div id="home">
        <div class="row">
          <div class="col-md-12">
            <form-table @daterange="daterange" :path="'/event/create'" :text="'event'"></form-table>
          </div>
          <div class="col-md-12">
            <event-table
              @discard="discard"
              @show="show"
              v-if="events.length > 0 && loading == false"
              :status="active"
            ></event-table>
            <div align="center" v-if="events.length == 0 && !loading">
              <span v-if="range.from == ''">No event found</span>
              <div v-else>No event was found within the date range
                <br>
                <button class="btn btn-yellow" @click="clear()">okay</button>
              </div>
            </div>
            <div align="center" v-if="loading">
              <!-- ss -->
              Loading...
            </div>
          </div>
        </div>
      </div>
    </div>
    <div align="right">
      <el-pagination
        v-show="!loading"
        small
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="totalItems"
        :page-count="pages"
        @current-change="changePage"
      ></el-pagination>
    </div>

    <modal v-if="showModal">
      <Accept v-if="modalType == 'accept'" @accept="accept" :text="'event'"></Accept>
      <Decline v-else @decline="decline"></Decline>
    </modal>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import EventTable from "@/components/admin/table";
import FormTable from "@/components/admin/form-table";
import Modal from "@/shared/base-modal";
import Accept from "@/shared/accept";
import Decline from "@/shared/decline";
import Api from "@/api/events";
import Helper from "@/helpers/myhelper";
export default {
  data() {
    return {
      Helper: Helper,
      active: Helper.status.running,
      modalType: "accept",
      showModal: false,
      loading: false,
      selectedEvent: {},
      range: { from: "", to: "" }
    };
  },
  created() {
    this.loadEvents();
  },
  computed: {
    ...mapGetters("event", ["events", "pages", "totalItems", "pageSize"])
  },
  methods: {
    ...mapActions("event", ["getEvents", "publishEvent", "declineEvent"]),
    daterange(range) {
      this.range = range;
      this.loadEvents();
    },
    clear() {
      this.range = { from: "", to: "" };
      this.loadEvents();
    },
    setActive(tab) {
      this.active = tab;
      this.range = { from: "", to: "" };
      this.getEvents({ status: tab })
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    changePage(page) {
      // return;
      this.loadEvents(page);
    },
    loadEvents(page = 1) {
      this.loading = true;
      this.getEvents({
        page,
        status: this.active,
        to: this.range.to,
        from: this.range.from
      })
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    discard(Id) {
      this.$notify({
        message: "Discarding event",
        type: "info",
        title: "Event"
      });
      Api.discardEvent(Id).then(() => {
        this.$notify({
          message: "Discarded successfully",
          type: "success",
          title: "Event"
        });
        this.loadEvents();
      });
    },
    show(modal, event) {
      this.modalType = modal;
      this.selectedEvent = event;
      this.showModal = true;
    },
    decline(reason) {
      if (reason) {
        Api.decline({ Id: this.selectedEvent._id, comment: reason }).then(
          response => {
            if (response.status) {
              this.$notify({
                message: `${
                  this.selectedEvent.event_name
                } has been declined successfully`,
                type: "success",
                title: "Decline event"
              });
              this.showModal = false;
            } else {
              this.$notify({
                message: `Unable to decline ${this.selectedEvent.event_name}`,
                type: "error",
                title: "Decline event"
              });
            }
          }
        );
      } else {
        this.showModal = false;
      }
    },
    accept(status) {
      if (status) {
        this.publishEvent({ Id: this.selectedEvent._id })
          .then(response => {
            if (response.status) {
              this.loadEvents();
              this.$notify({
                message: `${
                  this.selectedEvent.event_name
                } has been accepted and published successfully`,
                type: "success",
                title: "Publish event"
              });
              this.showModal = false;
            } else {
              this.$notify({
                message: `Unable to accept ${this.selectedEvent.event_name}`,
                type: "error",
                title: "Publish event"
              });
            }
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
          });
      } else {
        this.showModal = false;
      }
    }
  },
  components: {
    EventTable,
    FormTable,
    Modal,
    Accept,
    Decline
  },
  mounted() {}
};
</script>

<style scoped>
.px-3,
.py-2 {
  cursor: pointer !important;
}
</style>
