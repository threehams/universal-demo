import { createStore, applyMiddleware, compose } from "redux";
import createHistory from "history/createMemoryHistory";
import { connectRoutes } from "redux-first-router";
import { Request } from "express";

import { routesMap } from "../src/routesMap";
import { createReducer } from "../src/reducers";

export const configureStore = async (request: Request) => {
  const history = createHistory({ initialEntries: [request.path] });

  const { reducer, middleware, enhancer, thunk } = connectRoutes(
    history,
    routesMap,
  ); // notice `thunk`
  const rootReducer = createReducer({ location: reducer });
  // note the order that the enhancer and middleware are composed in: enhancer first, then middleware
  const store = createStore(
    rootReducer,
    compose(
      enhancer,
      applyMiddleware(middleware),
    ),
  );

  // using redux-thunk perhaps request and dispatch some app-wide state as well, e.g:
  // await Promise.all([ store.dispatch(myThunkA), store.dispatch(myThunkB) ])

  await thunk(store); // THE WORK: if there is a thunk for current route, it will be awaited here

  return store;
};
