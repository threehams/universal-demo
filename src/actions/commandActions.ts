import { AutocompleteItem } from "../models";

export interface CommandHistoryClear {
  type: "COMMAND_HISTORY_CLEAR";
}

export interface CommandSend {
  meta: {
    socket: boolean;
  };
  type: "COMMAND_SEND";
  payload: {
    command: string;
  };
}

export interface CommandComplete {
  type: "COMMAND_COMPLETE";
  payload: {
    command: string;
    cursorIndex: number;
    autocompleteItem: string;
  };
}

export interface CommandCloseAutocomplete {
  type: "COMMAND_CLOSE_AUTOCOMPLETE";
}
export interface CommandSelectAutocompleteItem {
  type: "COMMAND_SELECT_AUTOCOMPLETE_ITEM";
  payload: {
    item: AutocompleteItem;
  };
}

export type CommandSetCurrent = {
  type: "COMMAND_SET_CURRENT";
  payload: {
    command: string;
    cursorIndex: number;
  };
};

export interface CommandSetCursorIndex {
  type: "COMMAND_SET_CURSOR_INDEX";
  payload: {
    cursorIndex: number;
  };
}

export interface CompleteCommand {
  type: "COMMAND_COMPLETE";
  payload: {
    command: string;
    cursorIndex: number;
    autocompleteItem: string;
  };
}

export const clear = (): CommandHistoryClear => ({
  type: "COMMAND_HISTORY_CLEAR",
});

export const sendCommand = (command: string): CommandSend => ({
  meta: {
    socket: true,
  },
  payload: {
    command,
  },
  type: "COMMAND_SEND",
});

export const completeCommand = (
  command: string,
  cursorIndex: number,
  autocompleteItem: AutocompleteItem,
): CommandComplete => ({
  payload: {
    command,
    cursorIndex,
    autocompleteItem: autocompleteItem.path || autocompleteItem.name,
  },
  type: "COMMAND_COMPLETE",
});

export const setCursorIndex = (cursorIndex: number): CommandSetCursorIndex => ({
  payload: {
    cursorIndex,
  },
  type: "COMMAND_SET_CURSOR_INDEX",
});

export const setCurrentCommand = (
  command: string,
  cursorIndex: number,
): CommandSetCurrent => ({
  payload: {
    command,
    cursorIndex,
  },
  type: "COMMAND_SET_CURRENT",
});

export const selectNextAutocompleteItem = (
  options: AutocompleteItem[],
  current: AutocompleteItem,
) => {
  const index: number = options.findIndex(option => option === current);
  const item: AutocompleteItem =
    index === options.length - 1 ? options[0] : options[index + 1];
  return selectAutocompleteItem(item);
};

export const selectPreviousAutocompleteItem = (
  options: AutocompleteItem[],
  current: AutocompleteItem,
) => {
  const index = options.findIndex(option => option === current);
  const item = index === 0 ? options[options.length - 1] : options[index - 1];
  return selectAutocompleteItem(item);
};

export const selectAutocompleteItem = (
  item: AutocompleteItem,
): CommandSelectAutocompleteItem => ({
  payload: {
    item,
  },
  type: "COMMAND_SELECT_AUTOCOMPLETE_ITEM",
});

export const closeAutocomplete = (): CommandCloseAutocomplete => ({
  type: "COMMAND_CLOSE_AUTOCOMPLETE",
});
