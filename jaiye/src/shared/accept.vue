<template>

     <div class="modal-dialog" role="document">
                                                                <div class="modal-content p-5" >
    <div class="row" >
     <div class="col-md-12" >
         <p class="text-center" >
      Are you sure you want to accept this {{text? text : 'listing'}} and publish<br>
          it to Jaiye Lagos website?
   </p>
                                                                                           
  </div>
<div class="col-md-2 col-xs-12" ></div>
<div class="col-md-8 col-xs-12" >
<p class="text-center" >
                                                                                    <form class="form-inline my-3" onsubmit="return false">
                                                                                        <button class="btn btn-blue mx-1" style="color: #fff; width: 7em;" @click="$emit('accept',true)">Accept</button>
                                                                                        <button class="btn btn-red mx-1" style="color: #fff; width: 7em;" @click="$emit('accept',false)">Cancel</button>
                                                                                    </form>
                                                                                </p> 
                                                                        </div>
                                                                        <div class="col-md-2 col-xs-12" ></div>
                                                                    </div>  
                                                                    </div>  
                                                                    </div>  
</template>
<script>
export default {
    props:['text'],
    methods:{
        discard(){
        }
    }
}
</script>
<style scoped>
.formbod label{
margin-top: 1.2em;
}
.formbod textarea, .modal textarea{
background: rgba(43, 42, 141, 0.15);
border-radius: 5px;
border: none;   
}
.formbod{
background: #FFFFFF;
border: 1px solid rgba(209, 216, 245, 0.6);
box-sizing: border-box;
box-shadow: 0px 2px 15px rgba(128, 152, 213, 0.25);
border-radius: 5px;
width: 100%;
color: #3D3F99;
padding: 1em;
margin-bottom: 1em;
}
.modal-dialog{
    color: #3D3F99;
}
</style>