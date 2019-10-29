import Vue from 'vue'
import App from './App.vue'

require('normalize.css');

// import './assets/custom.css'
import './assets/main.scss'

import './assets/box.png'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
