import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false

import mock from './mock-data.json'

let data = {
  images: mock,
  liked: []
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
