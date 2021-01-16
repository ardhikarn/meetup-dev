import Vue from 'vue'
import Vuex from 'vuex'
import Meetup from './meetup'
import User from './user'
import Shared from './shared'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    Meetup,
    User,
    Shared
  }
})
