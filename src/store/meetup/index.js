import firebase from 'firebase'

export default {
  state: {
    meetups: []
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
    }
  },
  getters: {
    shortDateMeetups(state) {
      return state.meetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups(state, getters) {
      return getters.shortDateMeetups.slice(0, 5) // LIMIT FEATURED MEETUPS
    },
    loadedMeetup(state) {
      return meetupId => {
        return state.meetups.find(meetup => {
          return meetup.id === meetupId
        })
      }
    }
  }
}
