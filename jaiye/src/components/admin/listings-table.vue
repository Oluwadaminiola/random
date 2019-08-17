<template>
  <table class="col-md-12">
    <thead style="padding: 1em; margin-bottom: +1em;">
      <tr>
        <th>
          <input type="checkbox">
        </th>
        <th>ID No</th>
        <th>Businness Name</th>
        <th>Location</th>
        <!-- <th>Type</th> -->
        <th>Subcategory</th>
        <th>Email Address</th>
        <th>Phone Number</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody class="mt-5">
      <tr
        v-for="(listing,index) in listings"
        class="py-2"
        style="padding: 1em !important; margin-top: +1em;"
      >
        <td>
          <input type="checkbox">
        </td>
        <td>{{index + 1}}</td>
        <td>{{listing.business_name}}</td>
        <td>{{listing.address}}</td>
        <td>{{listing.industry.join(",")}}</td>
        <td>{{listing.tags.join(",")}}</td>
        <td>{{listing.email}}</td>
        <td>{{listing.phone}}</td>
        <td>
          <button class="btn btn-yellow" style="width: 6.5em;" @click="view(listing)">View</button>
        </td>
        <td v-if="status === Helper.status.running">
          <button @click="discard(listing)" class="btn btn-red" style="width: 6.5em;">Discard</button>
        </td>
        <td v-if="status === Helper.status.request || Helper.status.archived">
          <button class="btn btn-blue" @click.stop="$emit('show','accept',listing)">
            <i class="fas fa-check"></i>
          </button>
        </td>
        <td v-if="status === Helper.status.archived">
           <button class="btn btn-red" @click.stop="discard(listing)">
            <i class="fas fa-times"></i>
          </button>
        </td>
        <td v-if="status === Helper.status.request">
          <button class="btn btn-red" @click.stop="$emit('show','discard',listing)">
            <i class="fas fa-times"></i>
          </button>
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
    ...mapGetters("listing", ["listings"])
  },
  methods: {
    view(listing) {
      this.$router.push({
        path: "/listing/create",
        query: { listing: listing._id }
      });
    },
    discard(listing) {
      let context  = this;
      this.$confirm(
        "Do you want to discard this lisiting?"+listing.business_name+""
      ).then(res => {
        context.$emit("discard",listing._id)
      });
    }
  }
};
</script>
