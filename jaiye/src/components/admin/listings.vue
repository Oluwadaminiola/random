<template>
  <div id="events">
    <ul class="nav nav-tabs">
      <li class="px-3 py-2" :class="{'active':active == Helper.status.running}" @click="setActive(Helper.status.running)">
        <a data-toggle="tab">Listed</a>
      </li>
      <li class="px-3 py-2" :class="{'active':active == Helper.status.archived}" @click="setActive(Helper.status.archived)">
        <a data-toggle="tab">Archived</a>
      </li>
      <li class="px-3 py-2" :class="{'active':active == Helper.status.request}" @click="setActive(Helper.status.request)">
        <a data-toggle="tab">Requests</a>
      </li>
    </ul>

    <div class="tab-content">
      <div id="home">
        <div class="row">
          <div class="col-md-12">
            <form-table @daterange="daterange" :path="'/listing/create'" :text="'listing'"></form-table>
          </div>
          <div class="col-md-12">
            <listing-table
              v-if="listings.length > 0 && loading == false"
              @show="show"
              @discard="discard"
              :status="active"
            ></listing-table>
            <div align="center" v-if="listings.length == 0 && !loading">
              <!-- <span>No listing found</span> -->
              <span v-if="range.from == ''">No listing found</span>
              <div v-else>
                No listing was found within the date range <br>
          <button class="btn btn-yellow" @click="clear()">okay</button>

              </div>
            </div>
            <div align="center" v-if="loading">Loading...</div>
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
        :page-count="pages"
        :total="totalItems"
        @current-change="changePage"
      ></el-pagination>
    </div>
    <modal v-if="showModal">
      <Accept v-if="modalType == 'accept'" @accept="accept"></Accept>
      <Decline v-else @decline="decline"></Decline>
    </modal>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import ListingTable from "@/components/admin/listings-table";
import FormTable from "@/components/admin/form-table";
import Modal from "@/shared/base-modal";
import Accept from "@/shared/accept";
import Decline from "@/shared/decline";
import Api from "@/api/listing";
import Helper from "@/helpers/myhelper"
export default {
  data() {
    return {
      Helper:Helper,
      active: Helper.status.running,
      modalType: "accept",
      showModal: false,
      loading: false,
      selectedListing: {},
      range:{to:'',from:''}
    };
  },
  computed: {
    ...mapGetters("listing", ["listings", "pages", "pageSize", "totalItems"])
  },
  created() {
    this.loadListings();
  },
  methods: {
    ...mapActions("listing", ["getListings"]),

    setActive(tab) {
      this.active = tab;
      this.range = {from:'',to:''};
      this.loadListings();
    },
    clear(){
      this.range = {from:'',to:''};
      this.loadListings();
    },
    daterange(range){
      this.range = range;
      this.loadListings();
    },
    changePage(page) {
      this.loadListings(page);
    },
    loadListings(page) {
      this.loading = true;
      this.getListings({ page, status: this.active,to:this.range.to,from:this.range.from})
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    show(modal, selectedListing) {
      this.selectedListing = selectedListing;
      this.modalType = modal;
      this.showModal = true;
    },
    discard(Id) {
      this.$notify({
        message: "Discarding listing",
        type: "info",
        title: "Listing"
      });
      Api.discardListing(Id).then(() => {
        this.$notify({
          message: "Discarded successfully",
          type: "success",
          title: "Lisiting "
        });

        this.loadListings();
      });
    },
    decline(reason) {
      if (reason) {
        Api.decline({ Id: this.selectedListing._id, comment: reason }).then(
          response => {
            if (response.status) {
              this.$notify({
                message: `${
                  this.selectedListing.name
                } has been declined successfully`,
                type: "success",
                title: "Decline listing"
              });
              this.showModal = false;
            } else {
              this.$notify({
                message: `Unable to decline ${this.selectedListing.event_name}`,
                type: "error",
                title: "Decline lisiting"
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
        this.$notify({
          message: "Accepting listing",
          type: "info",
          title: "Listing"
        });
        this.showModal = false;
        Api.publishListing(this.selectedListing._id).then(response => {
          if (response.status) {
            this.$notify({
              message: "Listing accepted successfully",
              title: "Accept Listing",
              type: "success"
            });
          } else {
            this.$notify({
              message: "Unable to accept listing",
              title: "Accept Listing",
              type: "error"
            });
          }
          this.showModal = false;
        });
      } else {
        this.showModal = false;
      }
    }
  },
  components: {
    ListingTable,
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
