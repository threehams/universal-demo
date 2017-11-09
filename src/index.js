import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "react-hot-loader/lib/AppContainer";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";

const render = App =>
  ReactDOM.hydrate(
    <AppContainer>
      <Router>
        <App />
      </Router>
    </AppContainer>,
    document.getElementById("root")
  );

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./components/App.js", () => {
    const App = require("./components/App").default;
    render(App);
  });
}

render(App);
