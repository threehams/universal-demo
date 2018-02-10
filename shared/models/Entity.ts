export interface Entity {
  type: "entity";
  components: string[];
  currentHealth?: number;
  currentStorage?: number;
  description?: string;
  entities: string[];
  exits: string[];
  expanded?: boolean;
  id: string;
  indent?: number;
  maxHealth?: number;
  maxStorage?: number;
  name: string;
  owner?: string;
  path?: string;
  quantity?: number;
  selected?: boolean;
  states: string[];
}
