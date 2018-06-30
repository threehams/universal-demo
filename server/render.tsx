import React from "react";
import ReactDOM from "react-dom/server";
import { clearChunks, flushChunkNames } from "react-universal-component/server";
import flushChunks from "webpack-flush-chunks";
import { Provider } from "react-redux";

import { App } from "../src/views/App";
import { configureStore } from "./configureStore";

const render = ({ clientStats }: any) => async (
  request: any,
  response: any,
) => {
  const store = await configureStore(request);

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

export default render;
