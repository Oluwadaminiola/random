import axios from 'axios';
import Vue from 'vue';
import router from '@/router';
import store from '@/store';
import ElementUI from 'element-ui';
import state from '@/store/modules/credentials'


export var token = localStorage.getItem('token');
export const get_token = function () {
  var t = JSON.parse(localStorage.getItem('vuex'));
  token = t ? t.credentials.token : ''
  // ".eyJpZCI6IjVjMGQ4ZDYxNGNmNGE5MjJkZDJhYWM0ZiIsImlhdCI6MTU0NTkxNTc1MiwiZXhwIjoxNTQ4NTA3NzUyfQ.XZN9HpE8QA94bGTS80XQwZUpnpbrMbWK6i_AjneH6mQ"
  console.log('token loaded', token);
  // axios.defaults.headers.common['Authorization'] = `JWT ${token}`;
}
export const clear_token = function () {
  return localStorage.removeItem('token')
}
get_token();
// $(window).on('beforeunload', function(){    
//   get_token()
// });

// $(window).on('load', function(){    
//   console.log('hello jst loaded')
//   get_token()
// });

// console.log('getters', )
export const API = 'http://178.62.84.202:3000/';
// export const API = process.env.API || 'https://express-jwt-mongoose-example-enastvxceo.now.sh/';

console.log("Connecting API: " + API);

Vue.prototype.$API = API;
Vue.prototype.$get_token = get_token;

export const HOST = 'http://127.0.0.1:8080/#/';
export const Axios = axios.create({
  baseURL: API,
  // headers: {'Authorization': `JWT ${(localStorage.getItem('vuex'))?JSON.parse(localStorage.getItem('vuex')).credentials.token : ''}`}
});
// headers: {'Authorization': `JWT ${(localStorage.getItem('vuex'))?JSON.parse(localStorage.getItem('vuex')).credentials.token : ''}`}
// headers: {'Authorization': `JWT ${token}`}
// });
console.log('fine')

Axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // if (store.getters['credentials/token']) {
  //   console.log('asdf', store.getters['credentials/token'])
  // }  
  // Axios.defaults.headers.common['Authorization'] = `JWT ${token}`
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
Axios.interceptors.response.use((response) => {
  // Do something with response data
  return response.data;
}, function (error) {
  if (error.message == "Network Error") {
    Vue.prototype.$notify({ message: "Please check your internet", type: "error", title: "Network" })

  }
  if (error.response.data.message == "Invalid User Details" || error.response.data.message == "Invalid Login Details") {
    Vue.prototype.$notify({ message: error.response.data.message, type: "error", title: "Authentication" })

  }
  // Do something with response error
  if (error.response.status == 401) {
    if (!store.getters['credentials/token']) {
      router.push({ path: "login" })
    }
  }
  // return Promise.reject(error);
  return error
});
// module.exports = {
//     API: API,
//     blackAxios: defAxios,
// };
