import React from "react";
import ReactDOM from "react-dom/server";
import { clearChunks, flushChunkNames } from "react-universal-component/server";
import flushChunks from "webpack-flush-chunks";
import { routerForExpress } from "redux-little-router";
import { Provider } from "react-redux";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";

import { App } from "../src/views/App";
import { routes } from "../src/routes";

export default ({ clientStats }: any) => (request: any, response: any) => {
  const { reducer, middleware, enhancer } = routerForExpress({
    routes,
    request,
  });

  const store = createStore(
    combineReducers({ router: reducer }),
    {},
    compose(enhancer, applyMiddleware(middleware)),
  );

  clearChunks();
  const app = ReactDOM.renderToString(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const chunkNames = flushChunkNames();

  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

  response.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>react-universal-component-boilerplate</title>
          ${styles}
        </head>
        <body>
          <div id="root">${app}</div>
          ${cssHash}
          ${js}
          <script>window.__INITIAL_STATE__ = ${JSON.stringify(
            store.getState(),
          )};</script>
        </body>
      </html>`,
  );
};
