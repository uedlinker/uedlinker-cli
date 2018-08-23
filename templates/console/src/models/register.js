const delay = time => new Promise(resolve => setTimeout(() => resolve(), time))

module.exports = {
  state: {
    popoverVisible: false,
    pending: false,
    email: '',
  },
  reducers: {
    changePending (state, payload) {
      return {
        ...state,
        pending: payload,
      }
    },
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
        pending: false,
      }
    },
  },
  effects: {
    async register (payload) {
      console.log(payload)

      this.changePending(true)

      // TODO: 换成实际注册 API
      await delay(1000)

      this.registerSuccess(payload.email)

      return Promise.resolve()

    },
  },
}
