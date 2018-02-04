import { Map } from "immutable";
import { expect } from "../../__test__/configureExpect";

import { Entity, EntityState } from "../records";
import { entitiesReducer } from "./entitiesReducer";

import { SetState } from "../actions/messageActions";

describe("entitiesReducer", () => {
  describe("SET_STATE", () => {
    it("merges entity records", () => {
      const initial = Map({
        1: new Entity({
          id: "1",
          name: "thing1"
        }),
        2: new Entity({
          id: "2",
          name: "thing2"
        })
      });
      const action: SetState = {
        payload: {
          entities: Map({
            1: new Entity({
              id: "1",
              name: "thing1"
            }),
            3: new Entity({
              id: "3",
              name: "thing3"
            })
          })
        },
        type: "SET_STATE"
      };
      expect(entitiesReducer(initial, action)).to.equal(
        Map({
          1: new Entity({
            id: "1",
            name: "thing1"
          }),
          2: new Entity({
            id: "2",
            name: "thing2"
          }),
          3: new Entity({
            id: "3",
            name: "thing3"
          })
        })
      );
    });

    it("removes records which are marked for deletion", () => {
      const initial = Map({
        1: new Entity({
          id: "1",
          name: "thing1"
        }),
        2: new Entity({
          id: "2",
          name: "thing2"
        })
      });
      const action: SetState = {
        payload: {
          entities: Map({ 1: null }) as EntityState
        },
        type: "SET_STATE"
      };
      expect(entitiesReducer(initial, action)).to.equal(
        Map({
          1: null,
          2: new Entity({
            id: "2",
            name: "thing2"
          })
        })
      );
    });
  });
});
