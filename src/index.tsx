// Import only needed polyfills - saves lots of space and bundling time
import React from "react";
import { hydrate } from "react-dom";

import { AppContainer } from "react-hot-loader";
import { App } from "./views/App";

hydrate(
  <AppContainer>
    <App />
  </AppContainer>,
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
