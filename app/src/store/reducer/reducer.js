import { combineReducers } from 'redux';

import adultPoints from './adultPoints/adultPoints.js';
import test from './test/test.js';

export default combineReducers({
    adultPoints: adultPoints,
    test: test
});
