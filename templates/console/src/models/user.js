export default {
  state: {
    currentUser: {},
  },
  reducers: {
    updateUser (state, payload) {
      return {
        ...state,
        currentUser: payload,
      }
    },
  },
  effects: {
    getUserInfo (payload) {
      this.storeAuthority(payload)
    },
  },
}
