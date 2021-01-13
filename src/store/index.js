import Vue from 'vue'
import Vuex from 'vuex'

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
    user: {
      id: 'asdfaasdadsf001',
      registeredMeetups: ['qwertyzxcvb103']
    }
  },
  mutations: {
    setCreateMeetup(state, payload) {
      state.loadedMeetups.push(payload)
    }
  },
  actions: {
    createMeetup({ commit }, payload) {
      const meetup = {
        id: 'sdfsdfsdcsca',
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date
      }
      // Reach out to firebase and store it
      commit('setCreateMeetup', meetup)
    }
  },
  getters: {
    // eslint-disable-next-line
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    // eslint-disable-next-line
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    // eslint-disable-next-line
    loadedMeetup(state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId
        })
      }
    }
  },
  modules: {}
})
