<template>
     <div class="modal-dialog" role="document">
                                                                <div class="modal-content p-5" >
     <div class="row" >
                                                                                <div class="col-md-12" >
                                                                                        <p class="text-center" >
                                                                                                Please enter information as to why you are declining<br>
                                                                                                 this request
                                                                                        </p>
                                                                                                   
                                                                                </div>
                                                                                <div class="col-md-12" >
                                                                                    <textarea cols="5" v-model="reason" class="form-control" style="height: 8em;" ></textarea>
                                                                                </div>
                                                                                <div class="col-md-3 col-xs-12" ></div>
                                                                                <div class="col-md-6 col-xs-12" align="center">
                                                                                        <p class="text-center" >
                                                                                            <form class="form-inline my-3" onsubmit="return false">
                                                                                                <button class="btn btn-blue" @click="$emit('decline',reason)" style="color: #fff;width:5em">Continue</button>
                                                                                                <button class="btn btn-red mx-2" @click="$emit('decline',false)"  style="color: #fff;width:5em">Cancel</button>
                                                                                            </form>
                                                                                        </p> 
                                                                                </div>
                                                                                <div class="col-md-3 col-xs-12" ></div>
                                                                            </div> 
                                                                            </div>
                                                                            </div>
</template>
<script>
export default {
    data(){
        return{
            reason:''
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

