import { List, Map, Set } from "immutable";
import { Entity, Location, State, Ui } from "../records";

import { expect } from "../../__test__/configureExpect";

import * as inventorySelectors from "./inventorySelectors";

describe("inventorySelectors", () => {
  describe("list", () => {
    context("when an item is expanded", () => {
      it("returns the list with the correct expansion and indent", () => {
        const player = new Entity({
          entities: List(["2"]),
          id: "1",
          name: "Big McLargeHuge"
        });
        const state = new State({
          entities: Map({
            1: player,
            2: new Entity({
              entities: List(["3"]),
              id: "2",
              name: "container"
            }),
            3: new Entity({
              id: "3",
              name: "item"
            }),
            4: new Entity({
              id: "4",
              name: "item"
            })
          }),
          location: new Location(),
          ui: new Ui({
            inventoryExpandedById: Set(["2"]),
            player: "1"
          })
        });
        const entities = inventorySelectors.list(state);
        expect(entities.toJS()).to.eql(
          Map({
            floor: List([]),
            self: List([
              new Entity({
                entities: List(["3"]),
                expanded: true,
                id: "2",
                indent: 1,
                name: "container",
                owner: "self",
                path: "self/container"
              }),
              new Entity({
                id: "3",
                indent: 2,
                name: "item",
                owner: "self",
                path: "self/container/item"
              })
            ])
          }).toJS()
        );
      });
    });

    context("when an item is not expanded", () => {
      it("filters out the item's entities", () => {
        const player = new Entity({
          entities: List(["2"]),
          id: "1",
          name: "Big McLargeHuge"
        });
        const state = new State({
          entities: Map({
            1: player,
            2: new Entity({
              entities: List(["3"]),
              id: "2",
              name: "container"
            }),
            3: new Entity({
              id: "3",
              name: "item"
            }),
            4: new Entity({
              id: "4",
              name: "item"
            })
          }),
          location: new Location(),
          ui: new Ui({
            player: "1"
          })
        });
        const props = { owner: "self" };
        const entities = inventorySelectors.list(state, props);
        expect(entities.toJS()).to.eql(
          Map({
            floor: List([]),
            self: List([
              new Entity({
                entities: List(["3"]),
                id: "2",
                indent: 1,
                name: "container",
                owner: "self",
                path: "self/container"
              })
            ])
          }).toJS()
        );
      });
    });
  });
});
