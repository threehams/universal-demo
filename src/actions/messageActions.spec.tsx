import { List, Map, Set } from "immutable";

import { expect } from "../../__test__/configureExpect";
import {
  Allowed,
  AllowedObjectType,
  Command,
  CommandPart,
  Entity,
} from "../models";
import * as messageActions from "./messageActions";

describe("messageActions", () => {
  describe("setState", () => {
    it("converts command data to a set of records", () => {
      const stateData = {
        availableCommands: [
          {
            name: "move",
            parts: [
              {
                allowed: [
                  {
                    components: ["unlockable"],
                    names: ["open"],
                    owners: ["floor"],
                    states: ["unlocked"],
                    types: ["entity"] as AllowedObjectType[],
                  },
                ],
              },
            ],
          },
        ],
      };
      const expected = Set([
        new Command({
          name: "move",
          parts: List([
            new CommandPart({
              allowed: List([
                new Allowed({
                  components: Set(["unlockable"]),
                  names: Set(["open"]),
                  owners: Set(["floor"]),
                  states: Set(["unlocked"]),
                  types: Set<AllowedObjectType>(["entity"]),
                }),
              ]),
            }),
          ]),
        }),
      ]);
      expect(
        messageActions.setState(stateData).payload.availableCommands,
      ).to.equal(expected);
    });
  });

  describe("entities", () => {
    it("converts entity data to a map of records", () => {
      const stateData = {
        entities: {
          1: {
            components: ["attackable"],
            entities: ["2"],
            id: "1",
            name: "thing",
            states: ["attacking"],
          },
        },
      };

      const expected = Map({
        1: new Entity({
          components: Set(["attackable"]),
          entities: List(["2"]),
          id: "1",
          name: "thing",
          states: Set(["attacking"]),
        }),
      });
      expect(messageActions.setState(stateData).payload.entities).to.equal(
        expected,
      );
    });
  });
});
