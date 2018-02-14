import { CommandState, EntityState, TransactionState } from "./";

export interface State {
  command: CommandState;
  entities: EntityState;
  transactions: TransactionState;
}
