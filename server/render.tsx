import React from "react";
import ReactDOM from "react-dom/server";
import App from "../src/views/App";

export default ({ clientStats }) => (req, res) => {
  const app = ReactDOM.renderToString(<App />);

  res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>react-universal-component-boilerplate</title>
        </head>
        <body>
          <div id="root">${app}</div>
        </body>
      </html>`,
  );
};
