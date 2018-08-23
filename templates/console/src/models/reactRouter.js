import {
  push,
  go,
  goBack,
  goForward,
  replace,
} from 'connected-react-router'

const routerReducer = (state, { type, payload } = {}) => {
  if (type === '@@router/LOCATION_CHANGE') {
    return ({ ...state, ...payload })
  }

  return state
}

export default {
  state: {
    action: '',
    location: {
      pathname: '',
      search: '',
      hash: '',
    },
  },
  baseReducer: routerReducer,
  effects: {
    push,
    replace,
    go,
    goBack,
    goForward,
  },
}
