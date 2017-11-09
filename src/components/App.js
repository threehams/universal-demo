import React from "react";
import universal from "react-universal-component";
import styles from "../css/App";
import UsageHero from "./UsageHero";
import { Route, withRouter } from "react-router-dom";

const UniversalComponent = universal(props => import(`./${props.name}`));

const loadComponent = name => props => (
  <UniversalComponent {...props} name={name} />
);
const routes = [
  "Foo",
  "Bar",
  "Baz",
  "Rudy",
  "Example",
  "ReduxFirstRouter",
  "Universal",
  "FaceySpacey",
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
    };
  }

  render() {
    const { history, location } = this.props;

    return (
      <div className={styles.container}>
        <h1>Hello Reactlandia</h1>

        <UsageHero />

        <Route exact path="/" render={loadComponent("Foo")} />
        {routes.map(name => (
          <Route
            exact
            key={name}
            path={`/${name}`}
            render={loadComponent(name)}
          />
        ))}

        <button
          onClick={() => history.push(nextRoute(routes, location.pathname))}
        >
          Change Page
        </button>

        <p>
          <span>*why are you looking at this? refresh the page</span>
          <span>and view the source in Chrome for the real goods</span>
        </p>
      </div>
    );
  }
}

const nextRoute = (routes, path) => {
  if (path === "/") {
    path = routes[0];
  }
  const newIndex = routes.indexOf(path.replace("/", "")) + 1;
  return routes[newIndex] || routes[0];
};

export default withRouter(App);
