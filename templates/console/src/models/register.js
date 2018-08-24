const delay = time => new Promise(resolve => setTimeout(() => resolve(), time))

module.exports = {
  state: {
    popoverVisible: false,
    email: '',
  },
  reducers: {
    togglePopoverVisible (state, payload) {
      return {
        ...state,
        popoverVisible: payload,
      }
    },
    registerSuccess (state, payload) {
      return {
        ...state,
        email: payload,
        popoverVisible: false,
      }
    },
  },
  effects: {
    async submit (payload) {
      console.log(payload)

      // TODO: 换成实际注册 API
      await delay(1000)

      this.registerSuccess(payload.email)

      return Promise.resolve()

    },
  },
}
