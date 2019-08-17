<template>
        <div id="events" >
                        <div class="row" >
                            <div class="col-md-12 " >
                                <div class="topbar " >
                                  <img @click="$goBack()" :src="require('@/assets/img/Group (2).png')">&nbsp 
                                  <b v-if="$route.query.listing">EDIT LISTING</b>
                                  <b v-else>CREATE NEW LISTING</b>
                                </div>
                            </div>
                            <div class="col-md-10 col-xs-12" >
                              <router-view></router-view>
                            </div>
                        </div>
                    </div>
</template>
