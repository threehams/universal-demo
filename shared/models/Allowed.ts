export type AllowedObjectType = "entity" | "command" | "exit";

export interface Allowed {
  components: string[];
  names: string[];
  owners: string[];
  states: string[];
  types: AllowedObjectType[];
}
