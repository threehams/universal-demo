import { AutocompleteItem, Command } from "./";

export interface CommandState {
  autocompleteOpen: boolean;
  autocompletePosition: number | null;
  autocompleteSelectedItem: AutocompleteItem | null;
  available: Command[];
  current: string;
  cursorIndex: number;
  history: string[];
}
