// 'any' is required since any action can be sent to any reducer (but the typings specify certain ones for intellisense)
// tslint:disable no-any
import { State } from "./models";

const INITIAL_STATE: State = {};

export const rootReducer = (state = INITIAL_STATE, action: any): State => {
  return state;
};
