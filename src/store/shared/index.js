export default {
  state: {
    isLoading: false,
    error: null
  },
  mutations: {
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
    clearError({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    isLoading(state) {
      return state.isLoading
    },
    error(state) {
      return state.error
    }
  }
}
