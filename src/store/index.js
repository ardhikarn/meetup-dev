import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    meetups: [],
    user: null,
    isLoading: false,
    error: null
  },
  mutations: {
    setMeetups(state, payload) {
      state.meetups = payload
    },
    setCreateMeetup(state, payload) {
      state.meetups.push(payload)
    },
    setUser(state, payload) {
      state.user = payload
    },
    setIsLoading(state, payload) {
      state.isLoading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      firebase
        .database()
        .ref('meetups/')
        .push(meetup)
        .then(data => {
          const key = data.key
          commit('setCreateMeetup', {
            id: key,
            ...meetup
          })
        })
        .catch(error => console.log(error))
      // Reach out to firebase and store it
    },
    readMeetups({ commit }) {
      commit('setIsLoading', true)
      firebase
        .database()
        .ref('meetups')
        .once('value')
        .then(data => {
          console.log('datas :', data)
          const meetups = []
          const obj = data.val()
          for (const key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              location: obj[key].location,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              description: obj[key].description,
              creatorId: obj[key].creatorId
            })
          }
          commit('setMeetups', meetups)
          commit('setIsLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setIsLoading', true)
        })
    },
    userSignup({ commit }, payload) {
      commit('setIsLoading', true)
      commit('clearError')
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setIsLoading', false)
          const newUser = {
            id: user.user.uid,
            registeredMeetups: []
          }
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setIsLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    userSignin({ commit }, payload) {
      commit('setIsLoading', true)
      commit('clearError')
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setIsLoading', false)
          const newUser = {
            id: user.user.uid,
            registeredMeetups: []
          }
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setIsLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    autoSignin({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredMeetups: []
      })
    },
    logout({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    // eslint-disable-next-line
    shortDateMeetups(state) {
      return state.meetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    // eslint-disable-next-line
    featuredMeetups(state, getters) {
      return getters.shortDateMeetups.slice(0, 5) // LIMIT FEATURED MEETUPS
    },
    // eslint-disable-next-line
    loadedMeetup(state) {
      return meetupId => {
        return state.meetups.find(meetup => {
          return meetup.id === meetupId
        })
      }
    },
    user(state) {
      return state.user
    },
    isLoading(state) {
      return state.isLoading
    },
    error(state) {
      return state.error
    }
  },
  modules: {}
})
