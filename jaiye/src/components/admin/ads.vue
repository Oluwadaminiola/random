<template>
  <div id="events">
    <div class="tab-content">
      <div id="home">
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
            :class="{'active':active == Helper.status.request}"
            @click="setActive(Helper.status.request)"
          >
            <a data-toggle="tab">Requests</a>
          </li>
        </ul>
        <div class="row">
          <div class="col-md-12">
            <form-table @daterange="daterange" :path="'/ad/create'" :text="'ad'"></form-table>
          </div>
          <div class="col-md-12">
            <ads-table
              @toggle="toggle"
              @discard="discard"
              @showLoader="showLoader()"
              @reloadAds="reloadAds"
              v-if="ads.length > 0 && loading == false"
              :status="active"
            ></ads-table>
            <div align="center" v-if="ads.length  == 0 && !loading">
              <span v-if="range.from == ''">No ad found</span>
              <div v-else>No ad was found within the date range
                <br>
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
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import AdsTable from "@/components/admin/ads-table";
import FormTable from "@/components/admin/form-table";
import Helper from "@/helpers/myhelper";
import Api from "@/api/ads";
export default {
  data() {
    return {
      Helper: Helper,
      loading: false,
      active: Helper.status.running,
      range: { from: "", to: "" }
    };
  },
  created() {
    this.loadAds();
  },
  computed: {
    ...mapGetters("ad", ["ads", "totalItems", "pages", "pageSize"])
  },
  methods: {
    ...mapActions("ad", ["getAds"]),
    setActive(active) {
      this.active = active;
      this.range = { from: "", to: "" };
      this.loadAds();
    },
    changePage(page) {
      this.loadAds(page);
    },
    daterange(range) {
      this.range = range;
      this.loadAds();
    },
    clear() {
      this.range = { from: "", to: "" };
      this.loadAds();
    },
    discard(ad) {
      this.$notify({ message: "discarding ad", title: "Ad", type: "info" });
      Api.discard(ad._id).then(() => {
        this.loadAds();
        this.$notify({
          message: "discarded succcesfully",
          title: "Ad",
          type: "success"
        });
      });
    },
    toggle(ad, action) {
      let message = "";
      let title = "";
      let api = "";
      let pronoun = "";
      switch (action) {
        case "activate":
          message = `Activated sucessfully`;
          title = "Activate ";
          pronoun = "Activating ad";
          break;
        case "deactivate":
          message = `Deactivated sucessfully`;
          title = "Deactivate ";
          pronoun = "Deactivating ad";

          break;
      }
      let status =  action == "activate" ? 1 : 0;
      this.$notify({
        message: "" + pronoun + "",
        title: "" + action + " ad",
        type: "info"
      });
      Api.toggle(ad._id,status)
        .then(() => {
          this.loadAds();
          this.$notify({
            message,
            title,
            type: "success"
          });
        })
        .catch(() => {
          this.$notify({
            message: "unable to " + action + " ad",
            title: "" + action + " ad",
            type: "info"
          });
        });
    },
    reloadAds() {
      this.loadAds();
    },
    showLoader(status) {
      this.loading = status;
    },
    loadAds(page = 1) {
      this.loading = true;
      this.getAds({
        page,
        status: this.active,
        from: this.range.from,
        to: this.range.to
      })
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  },
  components: {
    AdsTable,
    FormTable
  }
};
</script>
<style scoped>
.px-3,
.py-2 {
  cursor: pointer !important;
}
</style>
