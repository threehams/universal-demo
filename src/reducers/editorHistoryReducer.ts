import { EditorHistoryClear } from "../actions/editorActions";
import { SetState } from "../../shared/actions/messageActions";

type State = string[];
export const INITIAL_STATE: State = [];
type Actions = SetState | EditorHistoryClear;

export const editorHistoryReducer = (
  state = INITIAL_STATE,
  action: Actions,
) => {
  switch (action.type) {
    case "EDITOR_HISTORY_CLEAR":
      return [];
    case "SET_STATE":
      if (!action.payload.message) {
        return state;
      }
      return state.concat(
        `${state.length ? "\n" : ""}${action.payload.message}`.split("\n"),
      );
    default:
      return state;
  }
};
