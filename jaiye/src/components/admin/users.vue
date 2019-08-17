<template>
  <div id="events">
    <div class="tab-content">
      <div id="home">
        <div class="row">
          <div class="col-md-12">
            <router-link :to="{path:'/users/create'}">
              <button class="btn btn-yellow" style="width: 7em;">Create user</button>
            </router-link>
            <!-- <form-table :path="'/listing/create'" :text="'listing'"></form-table> -->
          </div>
          <div class="col-md-12">
            <users-table  @toggleUser="toggleUser" v-if="users.length > 0 && loading == false"></users-table>
            <div align="center" v-if="users.length == 0 && !loading">
              <span>No User found</span>
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
        :total="totalItems"
        :page-count="pages"
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
import UsersTable from "@/components/admin/users-table";
import Modal from "@/shared/base-modal";
import Accept from "@/shared/accept";
import Decline from "@/shared/decline";
import Api from "@/api/user";
export default {
  data() {
    return {
      active: 1,
      modalType: "accept",
      showModal: false,
      loading: false
    };
  },
  computed: {
    ...mapGetters("users", ["users", "pages", "totalItems", "pageSize"])
  },
  mounted() {
    this.loadUsers();
  },
  methods: {
    ...mapActions("users", ["getUsers"]),
    changePage(page) {
      // return;
      this.loadUsers(page);
    },
    loadUsers(page = 1) {
      this.loading = true;
      this.getUsers({ page })
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    show(modal) {
      this.modalType = modal;
      this.showModal = true;
    },
    toggleUser(user, action) {
      let message = "";
      let title = "";
      let api = "";
      let pronoun = "";
      switch (action) {
        case "activate":
          message = `Activated sucessfully`;
          title = "Activate ";
          pronoun = "Activating user";
          api = Api.activate;
          break;
        case "deactivate":
          message = `Deactivated sucessfully`;
          title = "Deactivate "   ;
          api = Api.deactivate;
          pronoun = "Deactivating user"

          break;
      }
      this.$notify({
        message: ""+pronoun+"",
        title: ""+action+" user",
        type: "info"
      });
      api(user._id)
        .then(() => {
          this.loadUsers();
          this.$notify({
            message,
            title,
            type: "success"
          });
        })
        .catch(() => {
          this.$notify({
            message: "unable to " + action + " user",
            title: "" + action + " user",
            type: "info"
          });
        });
    },
    decline(status) {
      if (status) {
        setTimeout(() => {
          this.showModal = false;
        }, 500);
      } else {
        this.showModal = false;
      }
    },
    accept(status) {
      if (status) {
        setTimeout(() => {
          this.showModal = false;
        }, 500);
      } else {
        this.showModal = false;
      }
    }
  },
  components: {
    UsersTable,
    Modal,
    Accept,
    Decline
  }
};
</script>

<style scoped>
.px-3,
.py-2 {
  cursor: pointer !important;
}
</style>
