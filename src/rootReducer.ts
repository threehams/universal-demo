// 'any' is required since any action can be sent to any reducer (but the typings specify certain ones for intellisense)
// tslint:disable no-any
import { State } from "./models";
import { commandReducer } from "./reducers/commandReducer";
import { editorHistoryReducer } from "./reducers/editorHistoryReducer";
import { entitiesReducer } from "./reducers/entitiesReducer";
import { locationReducer } from "./reducers/locationReducer";
import { uiReducer } from "./reducers/uiReducer";

const INITIAL_STATE: State = {};

export const rootReducer = (state = INITIAL_STATE, action: any): State => {
  return {
    command: commandReducer(state.command, action),
    editorHistory: editorHistoryReducer(state.editorHistory, action),
    entities: entitiesReducer(state.entities, action),
    location: locationReducer(state.location, action),
    ui: uiReducer(state.ui, action),
  };
};
