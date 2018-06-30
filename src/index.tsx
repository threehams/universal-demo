import React from "react";
import { hydrate } from "react-dom";
import { connectRoutes } from "redux-first-router";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import { composeWithDevTools } from "redux-devtools-extension";
import { AppContainer } from "react-hot-loader";

import { App } from "./views/App";
import { routesMap } from "./routesMap";
import { createReducer } from "../src/reducers";

const history = createHistory();

const { reducer, middleware, enhancer } = connectRoutes(history, routesMap);

const rootReducer = createReducer({ location: reducer });
const middlewares = applyMiddleware(middleware);

// note the order: enhancer, then middlewares
const store = createStore(
  rootReducer,
  composeWithDevTools(enhancer, middlewares),
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
      <Provider store={store}>
        <AppContainer>
          <App />
        </AppContainer>
      </Provider>,
      document.getElementById("root"),
    );
  });
}
