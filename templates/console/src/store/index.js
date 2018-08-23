import { init } from '@rematch/core'
import * as models from 'Models'
import reactRouterPluging from './createReactRouterPluging'

const store = init({
  models,
  plugins: [reactRouterPluging()],
})

export default store
