import { createStore, applyMiddleware } from 'redux'

import reducer from './reducer/reducer.js'
import middleware from './middleware/index.js'

export const configureStore = ({ history }) => {
  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware({ history }))
  )

  if (module.hot) {
    module.hot.accept('./reducer/reducer.js', () => {
      const nextReducer = require('./reducer/reducer.js')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
