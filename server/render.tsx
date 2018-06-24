import React from "react";
import ReactDOM from "react-dom/server";
import { clearChunks, flushChunkNames } from "react-universal-component/server";
import flushChunks from "webpack-flush-chunks";
import { App } from "../src/views/App";

export default ({ clientStats }: any) => (req: any, res: any) => {
  clearChunks();
  const app = ReactDOM.renderToString(<App />);
  const chunkNames = flushChunkNames();

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
