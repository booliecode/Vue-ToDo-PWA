import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import './registerServiceWorker'

Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
