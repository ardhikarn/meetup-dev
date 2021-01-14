import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl:
          'https://resources.matcha-jp.com/resize/720x2000/2019/12/20-93633.jpeg',
        id: 'qwertyzxcvb101',
        title: 'Meetup in Shibuya',
        location: 'Shibuya City',
        date: '13 January 2021 20:30',
        description:
          'Shibuya is a special ward in Tokyo, Japan. A major commercial and finance center, it houses the two busiest railway stations in the world, Shinjuku Station and Shibuya Station. As of May 1, 2016, it has an estimated population of 221,801 and a population density of 14,679.09 people per km².'
      },

      {
        imageUrl: 'https://static.toiimg.com/photo/47145223.cms',
        id: 'qwertyzxcvb102',
        title: 'Meetup in Tokyo',
        location: 'Tokyo City',
        date: '15 January 2021 22:30',
        description:
          'Tokyo, Japan’s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens.'
      },
      {
        imageUrl:
          'https://www.mensjournal.com/wp-content/uploads/2019/05/kyoto.jpg?w=900&h=506&crop=1&quality=86&strip=all&iswp=1',
        id: 'qwertyzxcvb103',
        title: 'Meetup in Kyoto',
        location: 'Kyoto City',
        date: '17 January 2021 18:30',
        description:
          "Kyoto, once the capital of Japan, is a city on the island of Honshu. It's famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses."
      }
    ],
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
    createMeetup({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString()
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
              description: obj[key].description
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
    },
    getMeetups(state) {
      return state.meetups
    }
  },
  modules: {}
})
