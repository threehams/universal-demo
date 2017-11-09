import React from "react";
import universal from "react-universal-component";
import styles from "../css/App";
import UsageHero from "./UsageHero";
import { Route, withRouter } from "react-router-dom";

const UniversalComponent = universal(props =>
  import(`./${props.name}`).then(module => console.log(module)),
);

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
      loading: false,
      error: false,
    };
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>Hello Reactlandia</h1>

        <UsageHero />

        <Route exact path="/" render={loadComponent("Foo")} />
        {routes.map(name => (
          <Route key={name} path={`/${name}`} render={loadComponent(name)} />
        ))}

        <button onClick={() => history.push("/Bar")}>Change Page</button>

        <p>
          <span>*why are you looking at this? refresh the page</span>
          <span>and view the source in Chrome for the real goods</span>
        </p>
      </div>
    );
  }
}

export default withRouter(App);
