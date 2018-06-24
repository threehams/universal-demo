// Import only needed polyfills - saves lots of space and bundling time
import React from "react";
import { hydrate } from "react-dom";
import { routerForBrowser } from "redux-little-router";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";

import { App } from "./views/App";
import { routes } from "./routes";

const { reducer, enhancer, middleware } = routerForBrowser({ routes });

declare var __INITIAL_STATE__: any;

const store = createStore(
  combineReducers({ router: reducer }),
  __INITIAL_STATE__,
  compose(enhancer, applyMiddleware(middleware)),
);

hydrate(
  <Provider store={store}>
    <AppContainer>
      <App />
    </AppContainer>
  </Provider>,
  document.getElementById("root"),
);

// tslint:disable-next-line no-any
declare var module: { hot: any };

if (module.hot) {
  module.hot.accept("./views/App", () => {
    const App = require("./views/App").App;
    hydrate(
      <AppContainer>
        <App />
      </AppContainer>,
      document.getElementById("root"),
    );
  });
}
