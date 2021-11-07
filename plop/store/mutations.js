// {{ pascalCase NAME }} module mutations

import initialState from './initialState'

export default {
  clear() {
    this.state.{{ camelCase NAME }} = {
      ...initialState()
    }
  }
}