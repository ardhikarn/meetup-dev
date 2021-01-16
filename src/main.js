import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import formatDate from './utilities/formatDate'
// import AlertComp from './components/Alert.vue'

Vue.config.productionTip = false

Vue.filter('date', formatDate)
// Vue.component('app-alert', AlertComp)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyC50nTA1dPxJic4xzq6Sc631C3pdOHPkiE',
      authDomain: 'meetups-dev.firebaseapp.com',
      databaseURL: 'https://meetups-dev-default-rtdb.firebaseio.com',
      projectId: 'meetups-dev',
      storageBucket: 'meetups-dev.appspot.com',
      messagingSenderId: '9572314350',
      appId: '1:9572314350:web:106d243ea981389d3297ff'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignin', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('readMeetups')
  }
}).$mount('#app')
