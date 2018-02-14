import { applyMiddleware, compose, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { State } from "./records";
import { rootReducer } from "./rootReducer";

// tslint:disable-next-line no-any
declare var module: { hot: any };

const configureStore = (initialState?: State) => {
  const finalCreateStore = compose(applyMiddleware(thunk))(createStore);
  const store: Store<State> = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept("./rootReducer", () => {
      const nextRootReducer = require("./rootReducer").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
