import { mergeWith, union, without } from "lodash";

import {
  EditorAddView,
  EditorRemoveView,
  EditorSetActiveView,
} from "../actions/editorActions";
import {
  InventorySelectItems,
  InventoryToggleExpand,
  InventoryToggleSelect,
} from "../actions/inventoryActions";
import { ResizePanel } from "../actions/layoutActions";
import { SetState } from "../../shared/actions/messageActions";
import {
  InventoryExpandItems,
  PlayerSetActiveView,
} from "../actions/playerActions";
import { SocketStatus } from "../actions/socketActions";
import { Ui } from "../models";

export const INITIAL_STATE: Ui = {
  activeEditorView: "0",
  activePlayerView: "inventory",
  alert: null,
  editorViews: ["0"],
  footerHeight: 300,
  inventoryExpandedById: [],
  player: null,
  selectedItems: [],
  sidebarHeight: 300,
  sidebarWidth: 250,
  statusEffects: [],
};
const ALERTS: { [key: string]: string } = {
  disconnected: "Reconnecting to server, give it a minute...",
  reconnected: "",
};
type Actions =
  | SetState
  | SocketStatus
  | EditorAddView
  | EditorRemoveView
  | EditorSetActiveView
  | InventoryToggleExpand
  | InventoryToggleSelect
  | InventorySelectItems
  | InventoryExpandItems
  | PlayerSetActiveView
  | ResizePanel;

export const uiReducer = (state = INITIAL_STATE, action: Actions): Ui => {
  switch (action.type) {
    case "EDITOR_ADD_VIEW":
      return addView(state, action.payload.id);
    case "EDITOR_REMOVE_VIEW":
      return removeView(state, action.payload.id);
    case "INVENTORY_SELECT_ITEMS":
      return { ...state, selectedItems: action.payload.ids };
    case "EDITOR_SET_ACTIVE_VIEW":
      return { ...state, activeEditorView: action.payload.id };
    case "INVENTORY_TOGGLE_SELECT":
      return toggleSelect(state, action);
    case "INVENTORY_TOGGLE_EXPAND":
      return toggleExpand(state, action);
    case "INVENTORY_EXPAND_ITEMS":
      return expandItems(state, action);
    case "SET_STATE":
      return setState(state, action);
    case "SOCKET_STATUS":
      return { ...state, alert: ALERTS[action.payload.status] };
    case "PLAYER_SET_ACTIVE_VIEW":
      return { ...state, activePlayerView: action.payload.name };
    case "RESIZE_PANEL":
      return { ...state, [action.payload.property]: action.payload.size };
    default:
      return state;
  }
};

function expandItems(state: Ui, action: InventoryExpandItems): Ui {
  return {
    ...state,
    inventoryExpandedById: union(
      state.inventoryExpandedById,
      action.payload.ids,
    ),
  };
}

function toggleExpand(state: Ui, action: InventoryToggleExpand): Ui {
  return {
    ...state,
    inventoryExpandedById: toggleSetItem(
      state.inventoryExpandedById,
      action.payload.id,
    ),
  };
}

function toggleSelect(state: Ui, action: InventoryToggleSelect): Ui {
  return {
    ...state,
    selectedItems: toggleSetItem(state.selectedItems, action.payload.id),
  };
}

function addView(state: Ui, id: string): Ui {
  return {
    ...state,
    editorViews: state.editorViews.concat(id),
    activeEditorView: state.activeEditorView.concat(id),
  };
}

function toggleSetItem(state: string[], id: string): string[] {
  return state.includes(id) ? without(state, id) : state.concat(id);
}

function removeView(state: Ui, id: string): Ui {
  const newState = { ...state, editorViews: without(state.editorViews, id) };
  const view = state.activeEditorView;
  return {
    ...newState,
    activeEditorView:
      view === id ? newState.editorViews[newState.editorViews.length] : view,
  };
}

function setState(state: Ui, action: SetState): Ui {
  const entitiesRemoved = Object.entries(action.payload.entities)
    .filter(([id, entity]) => entity === null)
    .reduce((removedState, [id, entity]) => {
      return {
        ...removeView(removedState, id),
        inventoryExpandedById: without(removedState.inventoryExpandedById, id),
      };
    }, state);

  const withEffects = setStatusEffects(entitiesRemoved, action);
  // If player or location are provided, merge them into the state
  const newState = { player: action.payload.player };
  return mergeWith(withEffects, newState, (prev, next) => next || prev);
}

function setStatusEffects(state: Ui, action: SetState): Ui {
  if (action.payload.statusEffects) {
    return { ...state, statusEffects: action.payload.statusEffects };
  }
  return state;
}
