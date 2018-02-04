import { fromJS, List, Map, OrderedSet, Set } from "immutable";
import { expect } from "../../__test__/configureExpect";

import * as editorActions from "../actions/editorActions";
import * as inventoryActions from "../actions/inventoryActions";
import { InventorySelectItems } from "../actions/inventoryActions";
import { SetState } from "../actions/messageActions";
import { InventoryExpandItems } from "../actions/playerActions";
import * as socketActions from "../actions/socketActions";
import { Ui } from "../records";
import { uiReducer } from "./uiReducer";

describe("uiReducer", () => {
  describe("EDITOR_ADD_VIEW", () => {
    it("adds a new view and sets it as active", () => {
      const initial = new Ui({
        editorViews: OrderedSet(["3"])
      });
      const action = editorActions.addView("1");
      const newState = uiReducer(initial, action);
      expect(newState.editorViews).to.equal(OrderedSet(["3", "1"]));
      expect(newState.activeEditorView).to.equal("1");
    });
  });

  describe("EDITOR_SET_ACTIVE_VIEW", () => {
    it("sets the view as active", () => {
      const initial = new Ui({
        activeEditorView: "1"
      });
      const action = editorActions.setActiveView("3");
      expect(uiReducer(initial, action).activeEditorView).to.equal("3");
    });
  });

  describe("EDITOR_REMOVE_VIEW", () => {
    context("when removing the current view", () => {
      it("sets the active view to the next available view", () => {
        const initial = new Ui({
          activeEditorView: "2",
          editorViews: OrderedSet(["1", "2", "3", "4"])
        });
        const action = editorActions.removeView("2");
        const newState = uiReducer(initial, action);
        expect(newState.editorViews).to.equal(OrderedSet(["1", "3", "4"]));
        expect(newState.activeEditorView).to.equal("4");
      });
    });

    context("when removing a non-current view", () => {
      it("does not change the active view", () => {
        const initial = new Ui({
          activeEditorView: "2",
          editorViews: OrderedSet(["1", "2"])
        });
        const action = editorActions.removeView("1");
        const newState = uiReducer(initial, action);
        expect(newState.editorViews).to.equal(OrderedSet("2"));
        expect(newState.activeEditorView).to.equal("2");
      });
    });
  });

  describe("INVENTORY_SELECT_ITEMS", () => {
    it("sets the items to the list given", () => {
      const initial = new Ui({});
      const action: InventorySelectItems = {
        payload: {
          ids: List(["2", "3", "4"]),
          owner: "self"
        },
        type: "INVENTORY_SELECT_ITEMS"
      };
      const newState = uiReducer(initial, action);
      expect(newState.selectedItems).to.equal(OrderedSet(["2", "3", "4"]));
    });
  });

  describe("INVENTORY_EXPAND_ITEMS", () => {
    it("sets the item as expanded", () => {
      const initial = new Ui();
      const action: InventoryExpandItems = {
        payload: {
          ids: List(["1", "2"])
        },
        type: "INVENTORY_EXPAND_ITEMS"
      };
      expect(uiReducer(initial, action)).to.equal(
        new Ui({
          inventoryExpandedById: Set(["1", "2"])
        })
      );
    });
  });

  describe("INVENTORY_TOGGLE_EXPAND", () => {
    it("toggles the expanded state", () => {
      const initial = new Ui();
      const action = inventoryActions.toggleExpand("1");
      expect(uiReducer(initial, action)).to.equal(
        new Ui(
          fromJS({
            inventoryExpandedById: Set("1")
          })
        )
      );
    });
  });

  describe("INVENTORY_TOGGLE_SELECT", () => {
    describe("when item is selected", () => {
      it("removes the item", () => {
        const initial = new Ui({
          selectedItems: OrderedSet(["1"])
        });
        const action = inventoryActions.toggleItem("1");
        expect(uiReducer(initial, action).selectedItems).not.to.contain("1");
      });
    });

    describe("when item is not selected", () => {
      it("adds the item", () => {
        const initial = new Ui();
        const action = inventoryActions.toggleItem("1");
        expect(uiReducer(initial, action).selectedItems).to.contain("1");
      });
    });
  });

  describe("PLAYER_SET_ACTIVE_VIEW", () => {
    it("sets the active view", () => {
      // derp
    });
  });

  describe("RESIZE_PANEL", () => {
    it("sets the size for the given property", () => {
      // derp
    });
  });

  describe("SET_STATE", () => {
    context("with a player", () => {
      it("replaces the player", () => {
        const initial = new Ui({ player: "2" });
        const action: SetState = {
          payload: {
            player: "1"
          },
          type: "SET_STATE"
        };
        expect(uiReducer(initial, action)).to.equal(new Ui({ player: "1" }));
      });
    });

    context("with a location", () => {
      it("replaces the player", () => {
        const initial = new Ui({ player: "2" });
        const action: SetState = {
          payload: {
            player: "1"
          },
          type: "SET_STATE"
        };
        expect(uiReducer(initial, action)).to.equal(new Ui({ player: "1" }));
      });
    });

    context("with no player or location", () => {
      it("keeps the existing data", () => {
        const initial = new Ui({ player: "1" });
        const action: SetState = {
          payload: {},
          type: "SET_STATE"
        };
        expect(uiReducer(initial, action)).to.equal(new Ui({ player: "1" }));
      });
    });

    context("with status effects", () => {
      it("replacing the existing effects", () => {
        const initial = new Ui({ statusEffects: Set(["bees"]) });
        const action: SetState = {
          payload: {
            statusEffects: Set(["fire"])
          },
          type: "SET_STATE"
        };
        expect(uiReducer(initial, action)).to.equal(
          new Ui({ statusEffects: Set(["fire"]) })
        );
      });
    });

    it("removes entities from inventoryExpandedById", () => {
      const initial = new Ui({
        inventoryExpandedById: Set(["1"])
      });
      const action: SetState = {
        payload: {
          entities: Map({ 1: null })
        },
        type: "SET_STATE"
      };
      expect(uiReducer(initial, action).inventoryExpandedById).to.equal(Set());
    });

    it("replaces the active view if the entity is removed", () => {
      const initial = new Ui({
        activeEditorView: "1",
        editorViews: OrderedSet(["0", "1"])
      });
      const action: SetState = {
        payload: {
          entities: Map({ 1: null })
        },
        type: "SET_STATE"
      };
      const newState = uiReducer(initial, action);
      expect(newState.editorViews).not.to.contain("1");
      expect(newState.activeEditorView).to.equal("0");
    });
  });

  describe("SOCKET_STATUS", () => {
    it("updates the alert", () => {
      const action = socketActions.disconnected();
      expect(uiReducer(undefined, action).alert).to.equal(
        "Reconnecting to server, give it a minute..."
      );
    });
  });
});
