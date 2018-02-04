import { EntityState } from "../models";
import { SetState } from "../../shared/actions/messageActions";

export const INITIAL_STATE: EntityState = {};

export const entitiesReducer = (state = INITIAL_STATE, action: SetState) => {
  switch (action.type) {
    case "SET_STATE":
      return setState(state, action);
    default:
      return state;
  }
};

function setState(state: EntityState, action: SetState) {
  return { ...state, ...action.payload.entities };
}
