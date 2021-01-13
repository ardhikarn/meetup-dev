import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
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
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyC50nTA1dPxJic4xzq6Sc631C3pdOHPkiE',
      authDomain: 'meetups-dev.firebaseapp.com',
      projectId: 'meetups-dev',
      storageBucket: 'meetups-dev.appspot.com',
      messagingSenderId: '9572314350',
      appId: '1:9572314350:web:106d243ea981389d3297ff'
    })
  }
}).$mount('#app')
