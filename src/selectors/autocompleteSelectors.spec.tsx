import { List, Map, Seq, Set } from "immutable";
import * as autocompleteSelectors from "./autocompleteSelectors";

import { AllowedObjectType } from "../records";

import { expect } from "../../__test__/configureExpect";

import {
  Allowed,
  Command,
  CommandPart,
  CommandState,
  Entity,
  Exit,
  Location,
  State,
  Ui
} from "../records";

describe("autocompleteSelectors", () => {
  describe("applyAllowed", () => {
    context("when types are specified", () => {
      it("restricts the objects to the given types", () => {
        const commands = Seq.Indexed([
          new Command({ name: "command1" }),
          new Command({ name: "command2" })
        ]);
        const objects = commands.concat(
          Seq.Indexed([
            new Entity({ id: "1", name: "entity1" }),
            new Entity({ id: "2", name: "entity2" })
          ])
        );
        const allowed = new Allowed({
          types: Set<AllowedObjectType>(["command"])
        });
        const filtered = autocompleteSelectors.applyAllowed(objects, allowed);
        expect(filtered).to.equal(commands);
      });
    });

    context("when types are not specified", () => {
      it("returns a flat map of all objects", () => {
        const objects = Seq.Indexed([
          new Command({ name: "command1" }),
          new Command({ name: "command2" }),
          new Entity({ id: "1", name: "entity1" }),
          new Entity({ id: "2", name: "entity2" })
        ]);
        const allowed = new Allowed({
          types: Set([])
        });
        const filtered = autocompleteSelectors.applyAllowed(objects, allowed);
        expect(filtered).to.equal(objects);
      });
    });

    context("when components are specified", () => {
      it("returns objects where any component matches", () => {
        const creature = new Entity({
          components: Set(["creature"]),
          id: "1",
          name: "creature"
        });
        const item = new Entity({
          components: Set(["item"]),
          id: "2",
          name: "item"
        });
        const container = new Entity({
          components: Set(["container"]),
          id: "3",
          name: "container"
        });
        const objects = Seq.Indexed([creature, item, container]);
        const allowed = new Allowed({
          components: Set(["item", "creature"]),
          types: Set<AllowedObjectType>(["entity"])
        });
        const filtered = autocompleteSelectors.applyAllowed(objects, allowed);
        expect(filtered).to.equal(List([creature, item]));
      });
    });
  });

  describe("availableOptions", () => {
    context("with no current command", () => {
      it("matches commands and exits", () => {
        const commandTransfer = new Command({
          name: "stash"
        });

        const state = new State({
          command: new CommandState({
            autocompleteOpen: true,
            available: Set([commandTransfer]),
            current: "s",
            cursorIndex: 1
          }),
          entities: Map({
            1: new Entity({
              id: "1",
              name: "readme.txt"
            })
          }),
          location: new Location({
            exits: List(["south"])
          }),
          ui: new Ui()
        });

        const exit = new Exit({ name: "south" });
        expect(autocompleteSelectors.availableOptions(state)).to.equal(
          List([exit, commandTransfer])
        );
      });
    });

    context("with a current command", () => {
      context("when the part filters by type", () => {
        it("returns the filtered and sorted list", () => {
          const commandTransfer = new Command({
            name: "transfer",
            parts: List([
              new CommandPart({
                allowed: List([
                  new Allowed({
                    types: Set<AllowedObjectType>(["entity"])
                  })
                ])
              })
            ])
          });

          const entity = new Entity({
            id: "1",
            name: "readme.txt"
          });
          const state = new State({
            command: new CommandState({
              autocompleteOpen: true,
              available: Set([commandTransfer]),
              current: "transfer re",
              cursorIndex: 9
            }),
            entities: Map({
              1: entity
            }),
            location: new Location(),
            ui: new Ui()
          });
          expect(autocompleteSelectors.availableOptions(state)).to.equal(
            List([entity])
          );
        });
      });

      context("when the part filters by component", () => {
        it("returns the filtered and sorted list", () => {
          // derp
        });
      });

      context("when the part filters by owner", () => {
        it("returns the filtered and sorted list", () => {
          // derp
        });
      });

      context("when the part contains multiple allowed lists", () => {
        it("adds all possibilities to a single sorted list", () => {
          // derp
        });
      });
    });
  });
});
