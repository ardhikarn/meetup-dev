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
    setUpdateMeetup(state, payload) {
      const meetup = state.meetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) meetup.title = payload.title
      if (payload.location) meetup.location = payload.location
      if (payload.description) meetup.description = payload.description
      if (payload.date) meetup.date = payload.date
    },
    setUserJoinMeetup(state, payload) {
      const id = payload.id
      if (
        state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0
      ) {
        return
      }
      state.user.registeredMeetups.push(id)
      state.user.fbKeys[id] = payload.firebaseKey
    },
    setUserUnjoinMeetup(state, payload) {
      const joinedMeetup = state.user.registeredMeetups
      joinedMeetup.splice(
        joinedMeetup.findIndex(meetup => meetup.id === payload),
        1
      )
      Reflect.deleteProperty(state.user.fbKeys, payload)
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
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase
        .database()
        .ref('meetups/')
        .push(meetup)
        .then(data => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase
            .storage()
            .ref('meetups/' + key + ext)
            .put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.ref.getDownloadURL().then(imageUrl => {
            return firebase
              .database()
              .ref('meetups')
              .child(key)
              .update({ imageUrl: imageUrl })
          })
        })
        .then(() => {
          commit('setCreateMeetup', {
            id: key,
            imageUrl: imageUrl,
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
    updateMeetup({ commit }, payload) {
      commit('setIsLoading', true)
      const updateObj = {}
      if (payload.title) updateObj.title = payload.title
      if (payload.location) updateObj.location = payload.location
      if (payload.description) updateObj.description = payload.description
      if (payload.date) updateObj.date = payload.date

      firebase
        .database()
        .ref('meetups')
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit('setIsLoading', false)
          commit('setUpdateMeetup', payload)
        })
        .catch(error => {
          commit('setIsLoading', false)
          console.log(error)
        })
    },
    userJoinMeetup({ commit, getters }, payload) {
      commit('setIsLoading', true)
      const user = getters.user
      firebase
        .database()
        .ref('/users/' + user.id)
        .child('/joins/')
        .push(payload)
        .then(data => {
          commit('setIsLoading', false)
          commit('setUserJoinMeetup', {
            id: payload,
            firebaseKey: data.key
          })
        })
        .catch(error => {
          commit('setIsLoading', false)
          console.log(error)
        })
    },
    userUnjoinMeetup({ commit, getters }, payload) {
      commit('setIsLoading', true)
      const user = getters.user
      if (!user.fbKeys) return
      const firebaseKey = user.fbKeys[payload]
      firebase
        .database()
        .ref('/users/' + user.id + '/joins/')
        .child(firebaseKey)
        .remove()
        .then(() => {
          commit('setIsLoading', false)
          commit('setUserUnjoinMeetup', payload)
        })
        .catch(error => {
          commit('setIsLoading', false)
          console.log(error)
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
            registeredMeetups: [],
            fbKeys: {}
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
        registeredMeetups: [],
        fbKeys: {}
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
