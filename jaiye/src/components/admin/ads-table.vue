<template>
  <table class="col-md-12">
    <thead style="padding: 1em; margin-bottom: +1em;">
      <tr>
        <th>
          <input type="checkbox">
        </th>
        <th>ID No</th>
        <th>Name</th>
        <th>Date Created</th>
        <th>Expiry Date</th>
        <th>Duration</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody class="mt-5">
      <tr
        v-for="(ad, index) in ads"
        class="py-2"
        style="padding: 1em !important; margin-top: +1em;"
      >
        <td>
          <input type="checkbox">
        </td>
        <td>{{index + 1}}</td>
        <td>{{ad.name}}</td>
        <td>{{$formatDate(ad.created_time)}}</td>
        <td>{{$formatDate(ad.expiry_date)}}</td>
        <!-- <td>{{add.address}}</td> -->
        <td>
          <button class="btn btn-yellow" style="width: 6.5em;" @click="view(ad)">View</button>
        </td>
        <td>
           <button
            class="btn btn-red"
            v-if="ad.type == Helper.status.running"
            style="width: 6.5em;"
            @click="discard(ad)"
          >Discard</button>
          <button
            class="btn btn-red"
            v-if="ad.status == 1"
            style="width: 6.5em;"
            @click="deactivate(ad)"
          >Deactivate</button>
          <button
            class="btn btn-lblue"
            v-else
            style="width: 6.5em;"
            @click="activate(ad)"
          >Activate</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import Helper from "@/helpers/myhelper"
export default {
  data(){
    return{
      Helper:Helper
    }
  },
  props: ["status"],
  computed: {
    ...mapGetters("ad", ["ads"])
  },
  methods: {
    ...mapActions("ad", ["delete"]),
    deactivate(ad) {
      this.$confirm("Do you want to deactivate this ad? " + ad.name + "")
        .then(res => {
          if(res){
            this.$emit("toggle",ad,"deactivate")
          }
        })
        .catch(err => {});
    },
    activate(ad) {
      this.$confirm("Do you want to deactivate this ad? " + ad.name + "")
        .then(res => {
          if(res){
            this.$emit("toggle",ad,"activate")
          }
        })
        .catch(err => {});
    },
    discard(ad) {
      this.$confirm("Do you want to discard this ad? " + ad.name + "")
        .then(res => {
          if(res){
            this.$emit("discard",ad)
          }
        })
        .catch(err => {});
    },

    view(ad) {
      this.$router.push({
        path: "/ad/create",
        query: { ad: ad._id }
      });
    }
  }
};
</script>

