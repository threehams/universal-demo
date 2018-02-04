import { fromJS, List } from "immutable";
import { expect } from "../../__test__/configureExpect";

import * as editorActions from "../actions/editorActions";
import { SetState } from "../actions/messageActions";
import { editorHistoryReducer } from "./editorHistoryReducer";

describe("editorHistoryReducer", () => {
  describe("SET_STATE", () => {
    context("with a message", () => {
      it("adds the command to the history with a trailing blank line", () => {
        const initial = List(["Hello."]);
        const action: SetState = {
          payload: {
            message: "You drop the USB drive.\nCongratulations."
          },
          type: "SET_STATE"
        };
        expect(editorHistoryReducer(initial, action)).to.equal(
          fromJS(["Hello.", "", "You drop the USB drive.", "Congratulations."])
        );
      });
    });

    context("with no message", () => {
      it("returns the state", () => {
        const initial = List(["Hello.", ""]);
        const action: SetState = {
          payload: {},
          type: "SET_STATE"
        };
        expect(editorHistoryReducer(initial, action)).to.equal(
          fromJS(["Hello.", ""])
        );
      });
    });

    context("when state is empty", () => {
      it("does not prepend a blank line", () => {
        const initial = List([]);
        const action: SetState = {
          payload: {
            message: "Oh hai mark"
          },
          type: "SET_STATE"
        };
        expect(editorHistoryReducer(initial, action)).to.equal(
          fromJS(["Oh hai mark"])
        );
      });
    });
  });

  describe("EDITOR_HISTORY_CLEAR", () => {
    it("clears the history", () => {
      const initial = List(["You are standing in an open field"]);
      const action = editorActions.clear();
      expect(editorHistoryReducer(initial, action)).to.equal(List());
    });
  });
});
