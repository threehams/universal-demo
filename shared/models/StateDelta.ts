import { Command, EntityState, Location } from "./";

export interface StateDelta {
  availableCommands: Command[];
  entities: EntityState;
  location?: Location;
  message?: string;
  player?: string;
  statusEffects: string[];
}
