<template>
  <table class="col-md-12">
    <thead style="padding: 1em; margin-bottom: +1em;">
      <tr>
        <th>
          <input type="checkbox">
        </th>
        <th>ID No</th>
        <th>Title</th>
        <th>Email</th>
        <!-- <th>Type</th> -->
        <th>Reported On</th>
        <th>Phone Number</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody class="mt-5">
      <tr
        v-for="(complain,index) in complaints"
        class="py-2"
        style="padding: 1em !important; margin-top: +1em;"
      >
        <td>
          <input type="checkbox">
        </td>
        <td>{{index + 1}}</td>
        <td>{{complain.title}}</td>
        <td>{{complain.email}}</td>
        <td>{{$formatDate(complain.created_time)}}</td>
        <td>{{complain.phone}}</td>
        <td>
          <button class="btn btn-yellow" style="width: 6.5em;" @click="view(complain)">View</button>
        </td>
        <td v-if="!complain.resolved && complain.status == 1 && status == Helper.status.pending">
          <button @click="markAsResolved(complain)" class="btn btn-blue" style="width: auto;">Mark as Resolved</button>
        </td>
        
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import Helper from "@/helpers/myhelper"

export default {
  props: ["status"],
  data(){
    return{
      Helper:Helper
    }
  },
  computed: {
    ...mapGetters("complaints", ["complaints"])
  },
  methods: {
    view(complaint) {
      
    },
    markAsResolved(complain) {
      let context  = this;
      this.$confirm(
        "Do you want to mark this as resolved? " +complain.title+""
      ).then(res => {
        context.$emit("resolve",complain._id)
      });
    }
  }
};
</script>
