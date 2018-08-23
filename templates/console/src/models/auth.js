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
}
