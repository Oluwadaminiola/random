<template>
  <table class="col-md-12">
    <thead style="padding: 1em; margin-bottom: +1em;">
      <tr>
        <th>
          <input type="checkbox">
        </th>
        <th>ID No</th>
        <th>Email</th>
        <th>Date Created</th>
        <th>Status</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody class="mt-5">
      <tr
        v-for="(user,index) in users"
        class="py-2"
        style="padding: 1em !important; margin-top: +1em;"
      >
        <td>
          <input type="checkbox">
        </td>
        <td>{{index + 1}}</td>
        <td>{{user.email}}</td>
        <td>{{$formatDate(user.created_time)}}</td>
        <td>{{user.status == 1 ? "Active" : "Suspended" }}</td>
        <td>
          <button class="btn btn-yellow" style="width: 6.5em;" @click="view(user)">View</button>
        </td>
        <td v-if="user.status == 0">
          <button @click="deactivate(user)" class="btn btn-blue" style="width: 6.5em;">Activate</button>
        </td>
        <td v-else>
          <button @click="activate(user)" class="btn btn-red" style="width: 6.5em;">Deactivate</button>
          
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("users", ["users"])
  },
  mounted(){
    console.log(this.users,"sdsd")
  },
  methods: {
    view(user) {
      this.$router.push({
        path: "/users/view",
        query: { user: user._id }
      });
    },
    deactivate(user) {
      this.$confirm(
        "Do you want to activate this user?"
      ).then(res => {
        this.$emit("toggleUser",user,'activate')
      });
    },
    activate(user) {
      this.$confirm(
        "Do you want to deactivate this user?"
      ).then(res => {
        this.$emit("toggleUser",user,'deactivate')

        // console.log(res);
      });
    }
  }
};
</script>
