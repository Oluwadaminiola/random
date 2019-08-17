<template>
    <span> 
        <JaiyeHeader/>
  <router-view/>
  <JaiyeFooter/>
    </span>
</template>
<script>
import JaiyeHeader from "@/shared/header"
import JaiyeFooter from "@/shared/footer"
export default {
      components:{
    JaiyeHeader, 
    JaiyeFooter
  },
  mounted(){
        // require('@/assets/css/page4.css');
     
  }
}
</script>
