// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import CustomPrototypes from './helpers/myhelper'
import store from './store'
// import Metascraper from './metascraper'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
// import VueSocketio from 'vue-socket.io';
import VeeValidate from 'vee-validate';
require("@/assets/css/bootstrap.css");
// require('@/assets/css/style.css')
require('@/assets/css/media.css')
// require('@/assets/css/mCustomScrollbar.min.css')
require('@/assets/css/page4.css')
// require('@/assets/css/ionicons.css')


require('@/assets/js/main.js')
let _this = this;
const config = {
  errorBagName: 'errors', // change if property conflicts
  fieldsBagName: 'fields',
  delay: 0,
  locale: 'en',
  dictionary: null,
  strict: true,
  classes: false,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'input|blur',
  inject: true,
  validity: false,
  aria: true,
};

Vue.prototype.$save = (data, path, isListing = false) => {
  let key = isListing ? 'listing' : 'event'
  let storedData = localStorage.getItem(key);
  if (storedData) {
    storedData = JSON.parse(storedData);
    data = { ...data, ...storedData };
  }
  // if(path)router.push({ path: path });
  // console.log(data);
  return data;
}

Vue.prototype.$getTag = (tag) => {
  let meaning = "";
  if (tag == 1) {
    meaning = "Nightlife";
  } else if (tag == 2) {
    meaning = "Cuisine";
  } else if (tag == 3) {
    meaning = "Music";
  }
  return meaning;
}

Vue.prototype.$getBase64Image = (ImageURL) => {
  /**
 * Convert a base64 string in a Blob according to the data and contentType.
 * 
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
  var block = ImageURL.split(";");
  if (block.length < -1) {
    return ImageURL;
  }
  // Get the content type
  var contentType = block[0].split(":")[1];// In this case "image/gif"
  // get the real base64 content of the file
  var b64Data = block[1].split(",")[1];
  contentType = contentType || '';
  var sliceSize = 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: 'image/jpeg' });

  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

Vue.prototype.$goBack = () => {
  window.history.back();
}

Vue.prototype.$formatCurrency = (currency) => {
  return currency;
}

Vue.prototype.$setImage = (image) => {
  return `${Vue.prototype.$API}thumbnail/${image}`;
}

Vue.prototype.$formatDate = (date) => {
  if (!date) {
    return "--"
  }
  return new Date(date).toLocaleDateString();
}
Vue.prototype.$defaultImage = ()=>{
  return require("@/assets/img/img-2.jpg")
},
Vue.prototype.$formatName = (user)=>{
  if(!user.created_by.first_name){
    return "--"
  }
  return `${user.created_by.first_name} ${user.created_by.last_name}`
},
Vue.prototype.$getItem = (key) => {
  let event = JSON.parse(localStorage.getItem(key));
  console.log(event)
  return event;
}
Vue.prototype.$logout = ()=>{
  store.dispatch("credentials/logout")
  router.push({path:"/login"})
}
Vue.prototype.$clearLocalStorage = (key) => {
  localStorage.removeItem(key);
}

Vue.prototype.$darangiMetaScrapper = (url, callback) => {
  $.ajax({
    url: 'https://cors-anywhere.herokuapp.com/'+url
  }).then(function (data) {
    console.log(data)
    var html = $(data);
    callback({ description: getMetaContent(html, 'description'), image:html.find('img').attr('src')})
});
}
function getMetaContent(html, name) {
  return html.filter(
    (index, tag) => tag && tag.name && tag.name == name).attr('content');
}
Vue.use(ElementUI, { locale });
Vue.use(VeeValidate, config);
// Vue.use(VueScroll);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})
