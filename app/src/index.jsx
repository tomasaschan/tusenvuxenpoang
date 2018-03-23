import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";

import { configureStore } from "./store/configure.js";
import App from "./app/app.jsx";

const history = createHistory();

var configure = {
  store: () => configureStore({ history }),
  app: App,
  css: require("./index.css").default
};

let store = configure.store();

const run = () => {
  let App = configure.app;
  let css = configure.css;

  render(
    <Provider store={store}>
      <App history={history} />
    </Provider>,
    document.getElementById("react-root")
  );
};
run();

if (module.hot) {
  module.hot.accept("./app/app.jsx", () => {
    var app = require("./app/app.jsx").default;
    configure = { ...configure, app };
    run();
  });

  module.hot.accept("./index.css", () => {
    const css = require("./index.css").default;
    configure = { ...configure, css };
    run();
  });

  // module.hot.accept(
  //   './store/configure.js',
  //   () => {
  //     const store = require('./store/configure.js').configureStore
  //     configure = { ...configure, store }
  //     run()
  //   }
  // )
}
