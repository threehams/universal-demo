import { CommandState, EntityState, Location, Ui } from "./";

export interface State {
  command: CommandState;
  editorHistory: string[];
  entities: EntityState;
  location: Location;
  ui: Ui;
}
