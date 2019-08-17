<template>
  <div class="dropdown">
    <button
      style="width: 9em;margin-top:5px"
      class="btn btn-lblue dropdown-toggle"
      type="button"
      id="dropdownMenuButton"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >Sort By</button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" @click="$emit('by','name')">Names</a>
      <a class="dropdown-item" @click="$emit('by','places')">Places</a>
      <a class="dropdown-item" @click="$emit('by','cities')">Cities</a>
    </div>
  </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
button{
    margin-top: 5px !important;
    width:7em !important;
}
</style>

