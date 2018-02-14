import { EntityState, Location, MessageTarget } from "./";

export interface ServerStateDelta {
  entities?: EntityState;
  location?: Location;
  messages?: { [key: string]: string };
  observers?: string[];
  owner?: string;
  target?: string;
  timestamp: number;
}
