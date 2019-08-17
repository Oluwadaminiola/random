<template>
  <table class="col-md-12">
    <thead style="padding: 1em; margin-bottom: +1em;">
      <tr>
        <th>
          <input type="checkbox">
        </th>
        <th>ID No</th>
        <th>Attraction Name</th>
        <th>Location</th>
        <th>Price</th>
        <th>Date Created</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody class="mt-5">
      <tr
        v-for="(attraction, index) in attractions"
        class="py-2"
        style="padding: 1em !important; margin-top: +1em;"
      >
        <td>
          <input type="checkbox">
        </td>
        <td>{{index + 1}}</td>
        <td>{{attraction.name}}</td>
        <td>{{attraction.address}}</td>
        <td>{{$formatCurrency(attraction.price)}}</td>
        <td>{{$formatDate(attraction.created_time)}}</td>
        <td>
          <button class="btn btn-yellow" style="width: 6.5em;" @click="view(attraction)">View</button>
        </td>
        <td>
          <button
            class="btn btn-red"
            style="width: 6.5em;"
            @click="discard(attraction)"
          >Discard</button>
          
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("attraction", ["attractions"])
  },
  methods: {
    discard(attraction) {
      this.$confirm(
        "Do you want to discard this attraction? "+attraction.name+""
      ).then(res => {
       this.$emit("discard",attraction)
      });
    },
    view(attraction) {
      this.$router.push({
        path: "/attraction/create",
        query: { attraction: attraction._id }
      });
    }
  }
};
</script>

