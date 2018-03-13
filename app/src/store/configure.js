import { createStore } from 'redux';

import reducer from './reducer/reducer.js';

export const configureStore = () => {
  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  if (module.hot) {
    module.hot.accept('./reducer/reducer.js', () => {
      const nextReducer = require('./reducer/reducer.js');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};
