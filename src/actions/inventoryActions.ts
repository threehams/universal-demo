import { Dispatch } from "redux";

import { State } from "../models";
import * as inventorySelectors from "../selectors/inventorySelectors";
import * as commandActions from "./commandActions";

export interface InventorySelectItems {
  type: "INVENTORY_SELECT_ITEMS";
  payload: {
    ids: string[];
    owner: string;
  };
}
export interface InventoryToggleExpand {
  type: "INVENTORY_TOGGLE_EXPAND";
  payload: {
    id: string;
  };
}
export interface InventoryToggleSelect {
  type: "INVENTORY_TOGGLE_SELECT";
  payload: {
    id: string;
  };
}

export const toggleExpand = (id: string): InventoryToggleExpand => ({
  payload: {
    id,
  },
  type: "INVENTORY_TOGGLE_EXPAND",
});

export const moveItem = (sourcePath: string, targetPath: string) => {
  return commandActions.sendCommand(`transfer ${sourcePath} to ${targetPath}`);
};

// options: { multiple: true/false }
export const selectItem = (
  selectId: string,
  owner: string,
  options = { multiple: false },
) => {
  return (dispatch: Dispatch<InventorySelectItems>, getState: () => State) => {
    /*
     * Build a list of item IDs for selection based on the first item selected in state
     * and the one currently being selected.
     */
    const createIdRange = () => {
      const state = getState();
      const entityList = inventorySelectors
        .list(state)
        .get(owner)
        .map(item => item.id)
        .toList();
      const selectedId = state.ui.selectedItems[0];
      const first = entityList.findIndex(id => id === selectedId);
      const last = entityList.findIndex(id => id === selectId);
      const result = entityList.slice(Math.min(first, last), Math.max(first, last) + 1;
      return first < last ? result : result.reverse();
    };

    const ids = options.multiple ? createIdRange() : [selectId];

    dispatch({
      payload: {
        ids,
        owner,
      },
      type: "INVENTORY_SELECT_ITEMS",
    });
  };
};

export const toggleItem = (id: string): InventoryToggleSelect => ({
  payload: {
    id,
  },
  type: "INVENTORY_TOGGLE_SELECT",
});
