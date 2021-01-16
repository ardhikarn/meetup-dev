import firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
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
    }
  },
  actions: {
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
    fetchUserData({ commit, getters }) {
      commit('setIsLoading', true)
      firebase
        .database()
        .ref('/users/' + getters.user.id + '/joins/')
        .once('value')
        .then(data => {
          const dataPairs = data.val()
          const registeredMeetups = []
          const swappedPairs = {}
          for (const key in dataPairs) {
            registeredMeetups.push(dataPairs[key])
            swappedPairs[dataPairs[key]] = key
          }
          const updatedUser = {
            id: getters.user.id,
            registeredMeetups: registeredMeetups,
            fbKeys: swappedPairs
          }
          commit('setIsLoading', false)
          commit('setUser', updatedUser)
        })
        .catch(error => {
          console.log(error)
          commit('setIsLoading', false)
        })
    },
    logout({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  }
}
