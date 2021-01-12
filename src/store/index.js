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
        date: '13 January 2021'
      },

      {
        imageUrl: 'https://static.toiimg.com/photo/47145223.cms',
        id: 'qwertyzxcvb102',
        title: 'Meetup in Tokyo',
        date: '15 January 2021'
      },
      {
        imageUrl:
          'https://www.mensjournal.com/wp-content/uploads/2019/05/kyoto.jpg?w=900&h=506&crop=1&quality=86&strip=all&iswp=1',
        id: 'qwertyzxcvb103',
        title: 'Meetup in Kyoto',
        date: '17 January 2021'
      }
    ],
    user: {
      id: 'asdfaasdadsf001',
      registeredMeetups: ['qwertyzxcvb103']
    }
  },
  mutations: {},
  actions: {},
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
