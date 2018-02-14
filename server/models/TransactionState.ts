import { ServerStateDelta } from "./";

export type TransactionState = Transaction[];

export interface Transaction extends ServerStateDelta {
  timestamp: number;
}
