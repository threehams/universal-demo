import { combineReducers } from "redux";

import { pageReducer } from "./pageReducer";

export const createReducer = ({ location }) =>
  combineReducers({
    location,
    page: pageReducer,
  });
