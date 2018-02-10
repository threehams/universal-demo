import { CommandPart } from "./";

export interface Command {
  type: "command";
  name: string;
  parts: CommandPart[];
  path?: string;
}
