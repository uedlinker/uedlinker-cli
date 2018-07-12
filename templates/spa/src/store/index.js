import { init } from '@rematch/core'
import immerPlugin from '@rematch/immer'

import todos from './todos'

const immer = immerPlugin()
const store = init({
  models: {
    todos,
  },
  plugins: [
    immer,
  ],
})

export default store
