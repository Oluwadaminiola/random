import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
// import * as Cookies from 'js-cookie';
// import * as actions from './actions';
// import * as getters from './getters';
import auth from './modules/auth';
import credentials from './modules/credentials';
import settings from './modules/settings';
import support from './modules/support';
import message from './modules/messaging';
import users from './modules/users';
import summary from './modules/summary';
import event from './modules/events';
import listing from './modules/listing';
import attraction from './modules/attractions';
import ad   from './modules/ads';
import complaints   from './modules/complaints';



Vue.use(Vuex);
export default new Vuex.Store({
  plugins: [createPersistedState({
      paths: ['auth','credentials']
    })
  ],
  
  modules: {
    auth,
    event,
    listing,
    attraction,
    ad,
    complaints,
    credentials,
    settings,
    support,
    users,
    message,
    summary,
  }
});

