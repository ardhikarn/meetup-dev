import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import formatDate from './utilities/formatDate'

Vue.config.productionTip = false

Vue.filter('date', formatDate)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
