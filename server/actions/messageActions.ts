import { Dispatch } from "redux";

import * as entityActions from "../actions/entityActions";
import { ServerStateDelta, State } from "../models";
export { setState, SetState } from "../../shared/actions/messageActions";

export interface SendMessage {
  type: "SEND_MESSAGE";
  payload: {
    message: string;
  };
}

export interface SetServerState {
  type: "SET_SERVER_STATE";
  payload: ServerStateDelta;
}

export const setServerState = (state: ServerStateDelta): SetServerState => ({
  payload: state,
  type: "SET_SERVER_STATE",
});

export function sendMessage(id: string, message: string): SendMessage {
  return {
    payload: {
      message,
    },
    type: "SEND_MESSAGE",
  };
}

type Actions = entityActions.MoveEntity;

/*
 * Parses a command from the server.
 */
export function parseCommand(command: string, userId: string) {
  return (dispatch: Dispatch<Actions>, getState: () => State): void => {
    const parts = command.split(/ +/);
    const state = getState();
    const root = state.command.available.find(
      availableCommand => availableCommand.name === parts[0],
    );
    if (!root) {
      sendMessage(userId, `I don\'t know how to ${parts[0]}.`);
      return;
    }

    let action;
    if (["move", "transfer", "give"].includes(root.name)) {
      action = entityActions.move(userId, parts[1], parts[3]);
    } else if (root.name === "drop") {
      action = entityActions.move(userId, parts[1], "floor");
    } else if (root.name === "take") {
      action = entityActions.move(userId, parts[1], "self");
    }

    // TODO remove assertion after redux-thunk typings are fixed
    // tslint:disable-next-line no-any
    dispatch<any>(action);
  };
}
