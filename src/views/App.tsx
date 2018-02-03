import * as React from "react";
import { DragDropContext } from "react-dnd";
import * as Html5Backend from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { Store } from "redux";

import { State } from "../models";
import { Layout } from "./Layout";

interface AppProps {
  store: Store<State>;
}

// this has to be a class or DragDropContext will throw errors
class BaseApp extends React.Component<AppProps, {}> {
  public render() {
    return (
      <Provider store={this.props.store}>
        <Layout />
      </Provider>
    );
  }
}

const Html5Context = DragDropContext(Html5Backend);
// required to avoid "may not be a union type" error
// tslint:disable-next-line no-any
export const App: any = Html5Context(BaseApp);
