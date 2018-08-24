import { LOGIN_TYPE } from 'Constants/index'

const delay = time => new Promise(resolve => setTimeout(() => resolve(), time))

export default {
  state: {
    autoLogin: false,
    loginType: LOGIN_TYPE.ACCOUNT,
    isLoginFailed: false,
  },
  reducers: {
    loginSuccess (state, payload) {
      console.log(payload)

      return {
        ...state,
        isLoginFailed: false,
      }
    },
    changeAutoLogin (state) {
      return {
        ...state,
        autoLogin: !state.autoLogin,
      }
    },
    changeLoginType (state, payload) {
      return {
        ...state,
        loginType: payload,
      }
    },
    loginFailure (state) {
      return {
        ...state,
        isLoginFailed: true,
      }
    },
  },
  effects: dispatch => ({
    async submit (payload) {

      // TODO: 换成实际登录 API
      await delay(1000)

      const { username, password } = payload
      let authority = ''

      if ((username === 'admin') && (password === '888888')) {
        authority = 'admin'
      } else if ((username === 'user') && (password === '123456')) {
        authority = 'user'
      } else {
        this.loginFailure()
        return Promise.resolve(false)
      }

      dispatch.auth.storeAuthority(authority)

      this.loginSuccess()

      return Promise.resolve(true)
    },
  }),
}
