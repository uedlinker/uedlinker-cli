import { init } from '@rematch/core'
import * as models from 'Models'
import createLoadingPlugin from '@rematch/loading'
import createReactRouterPlugin from './createReactRouterPluging'

// Options 设置请参考
// https://github.com/rematch/rematch/blob/master/plugins/loading/README.md#options
const loadingPlugin = createLoadingPlugin({})

const reactRouterPlugin = createReactRouterPlugin()

const store = init({
  models,
  plugins: [
    loadingPlugin,
    reactRouterPlugin,
  ],
})

export default store
