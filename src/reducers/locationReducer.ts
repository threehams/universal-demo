import { SetState } from "../../shared/actions/messageActions";
import { Location } from "../models";

export const INITIAL_STATE: Location = {
  description: "",
  entities: [],
  exits: [],
  name: "",
};

export const locationReducer = (state = INITIAL_STATE, action: SetState) => {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...action.payload.location };
    default:
      return state;
  }
};
