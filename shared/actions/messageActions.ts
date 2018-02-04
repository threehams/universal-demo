import { StateDelta } from "../models";

export interface SetState {
  payload: StateDelta;
  type: "SET_STATE";
}

export const setState = (stateData: StateDelta): SetState => ({
  payload: {
    availableCommands: stateData.availableCommands || [],
    entities: stateData.entities || {},
    location: stateData.location,
    message: stateData.message || "",
    player: stateData.player,
    statusEffects: stateData.statusEffects,
  },
  type: "SET_STATE",
});
