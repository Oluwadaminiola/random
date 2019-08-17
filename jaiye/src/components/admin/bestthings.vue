<template>
  <div id="events">
    <div class="row">
      <div class="col-md-12 p-0">
        <div class="thetop px-3">
          <div class="d-flex row">
            <div
              class="px-2"
              style="border-bottom: 2px solid #EF3733; color: #3d3f99; font-family: gothic;"
            >
              <b>Best Things to Do in Lagos</b>
            </div>
            <div class="px-4 py-1">
              <!--  -->
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <form-table @daterange="daterange" :path="'/listing/create'"></form-table>
      </div>
      <div class="col-md-12">
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
        <best-things @refresh="loadEvents()" v-if="!loading && events.length > 0"></best-things>
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
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import BestThings from "@/components/admin/table";
import FormTable from "@/shared/dashboar-search-header";
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
        from: this.range.from,
        isBestThings: true
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
    BestThings,
    FormTable,
    Modal,
    Accept,
    Decline
  },
  mounted() {}
};
</script>
