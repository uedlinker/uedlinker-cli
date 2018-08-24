import { setCurrentAuthority } from 'Components/Authorization'

export default {
  state: {
    authority: '',
  },
  reducers: {
    storeAuthority (state, payload) {
      return {
        ...state,
        authority: payload,
      }
    },
  },
  effects: {
    updateAuthority (payload) {
      setCurrentAuthority(payload)
      this.storeAuthority(payload)
    },
  },
}
