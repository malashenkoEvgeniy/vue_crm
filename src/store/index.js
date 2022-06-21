import { createStore } from 'vuex'
import auth from './auth'
import info from './info'

export default createStore({
  state: {
    error: null
  },
  getters: {
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  // eslint-disable-next-line no-dupe-keys
  getters: {
    error: s => s.error
  },
  actions: {
  },
  modules: {
    auth, info
  }
})
