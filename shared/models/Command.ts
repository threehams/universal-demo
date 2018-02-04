import { CommandPart } from "./";

export interface Command {
  name: string;
  parts: CommandPart[];
  path?: string;
}
