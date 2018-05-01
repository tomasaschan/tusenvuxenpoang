import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import rsvpFormState from './rsvpFormState.js'

export default combineReducers({
  rsvpFormState,
  router
})
