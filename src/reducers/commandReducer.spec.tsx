import { fromJS, List, Set } from "immutable";
import { expect } from "../../__test__/configureExpect";

import * as commandActions from "../actions/commandActions";
import { SetState } from "../actions/messageActions";
import { Command, CommandState } from "../records";
import { commandReducer } from "./commandReducer";

describe("commandReducer", () => {
  describe("COMMAND_CLOSE_AUTOCOMPLETE", () => {
    it("resets autocomplete properties", () => {
      const initial = new CommandState({
        autocompleteOpen: true,
        autocompletePosition: 1,
        autocompleteSelectedItem: new Command({ name: "a thing!" })
      });
      const action = commandActions.closeAutocomplete();
      const expected = new CommandState({
        autocompleteOpen: false,
        autocompletePosition: null,
        autocompleteSelectedItem: null
      });
      expect(commandReducer(initial, action)).to.equal(expected);
    });
  });
  describe("COMMAND_COMPLETE", () => {
    context("when autocomplete is closed", () => {
      it("returns the current command", () => {
        const initial = new CommandState({
          autocompleteOpen: false,
          current: "run"
        });
        const command: Command = new Command({ name: "run.js" });
        const action = commandActions.completeCommand("run", 3, command);
        const newState = commandReducer(initial, action);
        expect(newState.current).to.equal("run");
      });
    });

    context("when autocomplete is open", () => {
      context("when cursor is at the end of a part", () => {
        it("replaces that part of the command", () => {
          const initial = new CommandState({
            autocompleteOpen: true
          });
          const action = commandActions.completeCommand(
            "first sec third",
            9,
            new Command({ name: "second.js" })
          );
          const newState = commandReducer(initial, action);
          expect(newState.current).to.equal("first second.js third");
        });
      });

      context("when cursor is at the end of the command", () => {
        it("adds a space", () => {
          const initial = new CommandState({
            autocompleteOpen: true
          });
          const action = commandActions.completeCommand(
            "first sec third",
            9,
            new Command({ name: "second.js" })
          );
          const newState = commandReducer(initial, action);
          expect(newState.current).to.equal("first second.js third");
        });
      });

      context("when cursor is at the end of a part", () => {
        it("replaces that part of the command", () => {
          const initial = new CommandState({
            autocompleteOpen: true
          });
          const action = commandActions.completeCommand(
            "first sec third",
            9,
            new Command({ name: "second.js" })
          );
          const newState = commandReducer(initial, action);
          expect(newState.current).to.equal("first second.js third");
        });
      });

      context("when cursor is in the middle of a part", () => {
        it("replaces only the part of the command up to the cursor", () => {
          const initial = new CommandState({
            autocompleteOpen: true
          });
          const action = commandActions.completeCommand(
            "first second third",
            7,
            new Command({ name: "second" })
          );
          const newState = commandReducer(initial, action);
          expect(newState.current).to.equal("first second econd third");
        });
      });
    });
  });

  describe("COMMAND_HISTORY_CLEAR", () => {
    it("clears the history", () => {
      const initial = new CommandState({ history: List(["git status"]) });
      const action = commandActions.clear();
      expect(commandReducer(initial, action).history).to.equal(List());
    });
  });

  describe("COMMAND_SELECT_AUTOCOMPLETE_ITEM", () => {
    it("sets the item", () => {
      const item = new Command({ name: "oh hai mark" });
      const action = commandActions.selectAutocompleteItem(item);
      const expected = new CommandState({
        autocompleteSelectedItem: item
      });
      expect(commandReducer(undefined, action)).to.equal(expected);
    });
  });

  describe("COMMAND_SEND", () => {
    it("adds the command to the history", () => {
      const initial = new CommandState({ history: List(["git status"]) });
      const action = commandActions.sendCommand("git add .");
      expect(commandReducer(initial, action).history).to.equal(
        fromJS(["git status", "git add ."])
      );
    });

    it("clears the current command and cursorIndex", () => {
      const initial = new CommandState({
        current: "get inventory",
        cursorIndex: 11
      });
      const action = commandActions.sendCommand("do something else");
      const newState = commandReducer(initial, action);
      expect(newState.current).to.equal("");
      expect(newState.cursorIndex).to.equal(0);
    });
  });

  describe("COMMAND_SET_CURRENT", () => {
    context("when new command is shorter", () => {
      it("closes autocomplete", () => {
        const initial = new CommandState({
          autocompleteOpen: true,
          current: "get inv",
          cursorIndex: 6
        });
        const action = commandActions.setCurrentCommand("get in", 5);
        const newState = commandReducer(initial, action);
        expect(newState.current).to.equal("get in");
        expect(newState.cursorIndex).to.equal(5);
        expect(newState.autocompleteOpen).to.be.false;
      });
    });

    context("when new command is longer", () => {
      context("when new command ends with a space", () => {
        it("closes autocomplete", () => {
          const initial = new CommandState({
            current: "get inv",
            cursorIndex: 6
          });
          const action = commandActions.setCurrentCommand("get inv ", 8);
          const newState = commandReducer(initial, action);
          expect(newState.current).to.equal("get inv ");
          expect(newState.cursorIndex).to.equal(8);
          expect(newState.autocompleteOpen).to.be.false;
        });
      });

      context("when new command ends with a non-space character", () => {
        it("opens autocomplete and sets the autocomplete item", () => {
          const initial = new CommandState({
            current: "get inv",
            cursorIndex: 6
          });
          const action = commandActions.setCurrentCommand("get inve", 8);
          const newState = commandReducer(initial, action);
          expect(newState.current).to.equal("get inve");
          expect(newState.cursorIndex).to.equal(8);
          expect(newState.autocompleteOpen).to.be.true;
        });
      });
    });
  });

  describe("COMMAND_SET_CURSOR_INDEX", () => {
    context("when cursor index jumps more than one character", () => {
      it("closes autocomplete and clears the autocomplete item", () => {
        const initial = new CommandState({
          autocompleteOpen: true,
          autocompleteSelectedItem: new Command({ name: "thing" }),
          current: "first second third",
          cursorIndex: 6
        });
        const action = commandActions.setCursorIndex(8);
        const newState = commandReducer(initial, action);
        expect(newState.cursorIndex).to.equal(8);
        expect(newState.autocompleteOpen).to.be.false;
        expect(newState.autocompleteSelectedItem).to.be.null;
      });
    });

    context("when cursor index moves by 1", () => {
      context("when autocomplete is closed", () => {
        it("keeps autocomplete closed", () => {
          const initial = new CommandState({
            autocompleteOpen: false,
            current: "first second third",
            cursorIndex: 7
          });
          const action = commandActions.setCursorIndex(8);
          const newState = commandReducer(initial, action);
          expect(newState.cursorIndex).to.equal(8);
          expect(newState.autocompleteOpen).to.be.false;
          expect(newState.autocompleteSelectedItem).to.be.null;
        });
      });

      context("when autocomplete is open", () => {
        context("when cursor moves outside the current command", () => {
          it("closes autocomplete and clears the autocomplete item", () => {
            const initial = new CommandState({
              autocompleteOpen: true,
              autocompleteSelectedItem: new Command({ name: "thing" }),
              current: "first second third",
              cursorIndex: 6
            });
            const action = commandActions.setCursorIndex(5);
            const newState = commandReducer(initial, action);
            expect(newState.cursorIndex).to.equal(5);
            expect(newState.autocompleteOpen).to.be.false;
            expect(newState.autocompleteSelectedItem).to.be.null;
          });
        });

        context("when cursor stays within the current command", () => {
          it("keeps autocomplete open", () => {
            const initial = new CommandState({
              autocompleteOpen: true,
              current: "first second third",
              cursorIndex: 7
            });
            const action = commandActions.setCursorIndex(8);
            const newState = commandReducer(initial, action);
            expect(newState.cursorIndex).to.equal(8);
            expect(newState.autocompleteOpen).to.be.true;
          });
        });
      });
    });
  });

  describe("SET_STATE", () => {
    context("when availableCommands is empty", () => {
      it("returns the initial state", () => {
        const initial = new CommandState({
          available: Set([])
        });
        const action: SetState = {
          payload: {
            availableCommands: Set([])
          },
          type: "SET_STATE"
        };
        expect(commandReducer(initial, action)).to.equal(initial);
      });
    });

    context("when availableCommands contains commands", () => {
      it("merges existing commands with new commands", () => {
        const transfer = new Command({ name: "transfer" });
        const move = new Command({ name: "move" });
        const initial = new CommandState({
          available: Set([transfer])
        });
        const action: SetState = {
          payload: {
            availableCommands: Set([move])
          },
          type: "SET_STATE"
        };
        const expected = new CommandState({
          available: Set([transfer, move])
        });
        expect(commandReducer(initial, action)).to.equal(expected);
      });
    });
  });
});
