import { combineReducers } from 'redux'

import adultPoints from './adultPoints/adultPoints.js'
import test from './test/test.js'
import rsvp from './rsvp/rsvp.js'

export default combineReducers({
    adultPoints,
    test,
    rsvp
})
