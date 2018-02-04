import { List } from "immutable";

import { SetState } from "../actions/messageActions";
import { Location } from "../records";
import { locationReducer } from "./locationReducer";

import { expect } from "../../__test__/configureExpect";

describe("locationReducer", () => {
  describe("SET_STATE", () => {
    it("saves location data", () => {
      const location = new Location({
        exits: List(["north", "south"])
      });
      const action: SetState = {
        payload: {
          location
        },
        type: "SET_STATE"
      };
      expect(locationReducer(undefined, action)).to.equal(location);
    });
  });
});
