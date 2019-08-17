<template>
  <div id="events">
    <div class="tab-content">
      <div id="home">
        <div class="row">
          <div class="col-md-12">
            <form-table @daterange="daterange" :path="'/attraction/create'" :text="'new'"></form-table>
          </div>
          <div class="col-md-12">
            <attractions-table @discard="discard" v-if="attractions.length > 0 && loading == false"></attractions-table>
            <div align="center" v-if="attractions.length == 0 && loading == false">
              <span v-if="range.from == ''">No attraction found</span>
              <div v-else>No attraction was found within the date range
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
        @current-change="loadAttraction"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import AttractionsTable from "@/components/admin/attractions-table";
import FormTable from "@/components/admin/form-table";
import Api from "@/api/attractions"
export default {
  data() {
    return {
      loading: false,
      range: { to: "", from: "" }
    };
  },
  created() {
    this.loadAttraction();
  },
  computed: {
    ...mapGetters("attraction", [
      "attractions",
      "pageSize",
      "totalItems",
      "pages"
    ])
  },
  methods: {
    ...mapActions("attraction", ["getAttractions"]),
    daterange(range) {
      this.range = range;
      this.loadAttraction();
    },
    clear() {
      this.range = { to: "", from: "" };
      this.loadAttraction();
    },
    loadAttraction(page = 1) {
      this.loading = true;
      this.getAttractions({ page, to: this.range.to, from: this.range.from })
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    discard(attraction) {
      this.$notify({
        message: "Discarding "+attraction.name+" attraction",
        title: "Attraction",
        type: "info"
      });
      Api.discard(attraction._id)
        .then(() => {
          this.loadAttraction();
          this.$notify({
            message:"Attraction discarded successfully",
            title:"Attraction",
            type: "success"
          });
        })
        .catch(() => {
          this.$notify({
            message: "unable to discard attraction",
            title: "Attraction",
            type: "info"
          });
        });
    }
  },
  components: {
    AttractionsTable,
    FormTable
  }
};
</script>
