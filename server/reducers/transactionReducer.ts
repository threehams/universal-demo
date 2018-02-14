import { TransactionState } from "../models";

import { SetServerState } from "../actions/messageActions";

export const INITIAL_STATE: TransactionState = [];
type Actions = SetServerState;

export const transactionReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case "SET_SERVER_STATE":
      return state.concat(action.payload);
    default:
      return state;
  }
};
