<template>

    <router-view/>
</template>
<script>
import JaiyeHeader from "@/shared/header"
import JaiyeFooter from "@/shared/footer"
export  default {
  name: "app",
  components:{
    JaiyeHeader,
    JaiyeFooter
  }
}
</script>