// {{ pascalCase NAME }} module

import initialState from './initialState'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
  namespaced: true,
  state: () => ({
    ...initialState(),
  }),
  getters,
  actions,
  mutations
}