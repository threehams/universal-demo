import { Dispatch } from "redux";

import { setState } from "../../shared/actions/messageActions";
import { State, StateDelta } from "../models";

export const setInitialState = (state: StateDelta) => {
  return (dispatch: Dispatch<State>, getState: () => State) => {
    const currentState = getState();
    if (currentState.ui.player) {
      return;
    }

    dispatch(setState(state));
  };
};
