import history from 'Utils/history'
import { routerMiddleware } from 'connected-react-router'
import reactRouterModel from 'Models/reactRouter'

export default function createReactRouterPlugin () {
  const middleware = routerMiddleware(history)

  return {
    middleware,
    config: {
      models: {
        router: reactRouterModel,
      },
    },
    onStoreCreated () {
      return {
        history,
      }
    },
  }
}
