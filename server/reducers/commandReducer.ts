import { CommandState } from "../models";

import { SetState } from "../actions/messageActions";

export const INITIAL_STATE: CommandState = {
  available: [],
};

export const commandReducer = (state = INITIAL_STATE, action: SetState) => {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, available: action.payload.availableCommands };
    default:
      return state;
  }
};
