import React from "react";
import ReactDOM from "react-dom/server";
import createHistory from "history/createMemoryHistory";
import { flushChunkNames, clearChunks } from "react-universal-component/server";
import flushChunks from "webpack-flush-chunks";
import App from "../src/components/App";

export default ({ clientStats }) => (req, res) => {
  const history = createHistory({ initialEntries: [req.path] });
  const app = ReactDOM.renderToString(<App history={history} />);
  const chunkNames = flushChunkNames();

  clearChunks();
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

  res.send(
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
        </body>
      </html>`,
  );
};
