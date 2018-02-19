import React from "react";
import ReactDOM from "react-dom/server";
import { App } from "../src/views/App";
import { Stats } from "webpack";

export default ({ clientStats }) => (req, res) => {
  res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>react-universal-component-boilerplate</title>
          <link rel="stylesheet" href="/static/main.css">
        </head>
        <body>
          <div id="root"></div>
          <script src="/static/main.js"></script>
        </body>
      </html>`,
  );
};
