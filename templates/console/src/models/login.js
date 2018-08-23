import { LOGIN_TYPE } from 'Constants/index'

const delay = time => new Promise(resolve => setTimeout(() => resolve(), time))

export default {
  state: {
    autoLogin: false,
    loginType: LOGIN_TYPE.ACCOUNT,
    loginError: false,
  },
  reducers: {
    loginSuccess (state, payload) {
      console.log(payload)

      return {
        ...state,
        loginError: false,
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
    changeLoginResult (state, payload) {
      return {
        ...state,
        loginError: payload,
      }
    },
  },
  effects: dispatch => ({
    async login (payload) {

      // TODO: 换成实际登录 API
      await delay(1000)

      const { username, password } = payload
      let authority = ''

      if ((username === 'admin') && (password === '888888')) {
        authority = 'admin'
      } else if ((username === 'user') && (password === '123456')) {
        authority = 'user'
      } else {
        this.changeLoginResult(true)
        return Promise.resolve(false)
      }

      dispatch.auth.storeAuthority(authority)

      this.loginSuccess()

      return Promise.resolve(true)
    },
  }),
}
