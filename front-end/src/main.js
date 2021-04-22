import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Notifications from 'vue-notification';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueFlicking from "@egjs/vue-flicking";

import * as VueGoogleMaps from 'vue2-google-maps'

var googlemapskey = require('./assets/googleapikey.json');

Vue.config.productionTip = false
Vue.use(Notifications)

// import mock from './mock-data.json'

let data = {
  user: null,
  // images: mock,
  // liked: [],
  // previous: [],
}

Vue.use(VueFlicking);

Vue.use(VueGoogleMaps, {
  load: {
    key: googlemapskey.key,
    libraries: 'places',
  }
});

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
