import { createStore } from 'redux';

import reducer from './reducer/reducer.js';

export const configureStore = () => {
  const store = createStore(reducer);

  if (module.hot) {
    module.hot.accept('./reducer/reducer.js', () => {
      const nextReducer = require('./reducer/reducer.js');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};
