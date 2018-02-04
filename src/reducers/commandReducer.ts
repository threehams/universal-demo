import { union } from "lodash";

import {
  CommandCloseAutocomplete,
  CommandComplete,
  CommandHistoryClear,
  CommandSelectAutocompleteItem,
  CommandSend,
  CommandSetCurrent,
  CommandSetCursorIndex,
} from "../actions/commandActions";
import { SetState } from "../../shared/actions/messageActions";
import { CommandState } from "../models";

export const INITIAL_STATE: CommandState = {
  autocompleteOpen: false,
  autocompletePosition: null,
  autocompleteSelectedItem: null,
  available: [],
  current: "",
  cursorIndex: 0,
  history: [],
};

type CommandAction =
  | CommandCloseAutocomplete
  | CommandComplete
  | CommandHistoryClear
  | CommandSelectAutocompleteItem
  | CommandSend
  | CommandSetCurrent
  | CommandSetCursorIndex
  | SetState;

export const commandReducer = (
  state = INITIAL_STATE,
  action: CommandAction,
) => {
  switch (action.type) {
    case "COMMAND_HISTORY_CLEAR":
      return { ...state, history: [] };
    case "COMMAND_SEND":
      return sendCommand(state, action);
    case "COMMAND_COMPLETE":
      if (!state.autocompleteOpen) {
        return state;
      }
      return completeCommand(state, action);
    case "COMMAND_CLOSE_AUTOCOMPLETE":
      return closeAutocomplete(state);
    case "COMMAND_SELECT_AUTOCOMPLETE_ITEM":
      return { ...state, autocompleteSelectedItem: action.payload.item };
    case "COMMAND_SET_CURRENT":
      return setCurrentCommand(state, action);
    case "COMMAND_SET_CURSOR_INDEX":
      return setCursorIndex(state, action.payload.cursorIndex);
    case "SET_STATE":
      return setState(state, action);
    default:
      return state;
  }
};

function setState(state: CommandState, action: SetState) {
  return {
    ...state,
    available: union(state.available, action.payload.availableCommands),
  };
}

function sendCommand(state: CommandState, action: CommandSend) {
  return closeAutocomplete({
    ...state,
    history: state.history.concat(action.payload.command),
    current: "",
    cursorIndex: 0,
  });
}

function setCursorIndex(state: CommandState, index: number) {
  const currentIndex = state.cursorIndex;
  const indexSet = { ...state, cursorIndex: index };
  if (
    !state.autocompleteOpen ||
    Math.abs(currentIndex - index) > 1 ||
    state.current[index] === " "
  ) {
    return closeAutocomplete(indexSet);
  }
  return indexSet;
}

function completeCommand(
  state: CommandState,
  { payload: { command, cursorIndex, autocompleteItem } }: CommandComplete,
) {
  return replaceCommand(state, command, cursorIndex, autocompleteItem);
}

function replaceCommand(
  state: CommandState,
  command: string,
  index: number,
  replacement: string,
) {
  // Slice in half at index
  const tail = command.slice(index);
  const head = command.slice(0, index);
  const lastSpace = head.lastIndexOf(" ") + 1;
  // Remove the expected autocomplete fragment from head, replace with replacement, tack on tail
  const cursorIndex = lastSpace + replacement.length + 1;
  return {
    ...state,
    autocompletePosition: cursorIndex,
    current:
      head.slice(0, lastSpace) +
      replacement +
      (tail[0] === " " ? "" : " ") +
      tail,
    cursorIndex,
  };
}

function closeAutocomplete(state: CommandState) {
  return {
    ...state,
    autocompleteOpen: false,
    autocompletePosition: null,
    autocompleteSelectedItem: null,
  };
}

function setCurrentCommand(
  state: CommandState,
  { payload: { command, cursorIndex } }: CommandSetCurrent,
) {
  const currentCommand = state.current;
  const newState = { ...state, current: command, cursorIndex };
  if (
    command[cursorIndex - 1] === " " ||
    currentCommand.length > command.length
  ) {
    return closeAutocomplete(newState);
  }

  const position = state.autocompletePosition;
  return {
    ...newState,
    autocompleteOpen: true,
    autocompletePosition: position ? position : cursorIndex,
  };
}
