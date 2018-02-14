import { createSelector } from "reselect";
import { flatMap } from "lodash";

import { Entity } from "../models";
import * as entitySelectors from "./entitySelectors";

type OwnerEntityMap = { [key: string]: Entity[] };

export const list = createSelector(
  entitySelectors.entitiesWithPath,
  state => state.ui,
  state => state.location,
  (entities, ui, location): OwnerEntityMap => {
    const floorEntities = flatMap(entityIds("floor"), entityId =>
      addUiData(entityId, 1),
    );
    const selfEntities = flatMap(entityIds("self"), entityId =>
      addUiData(entityId, 1),
    );
    return {
      floor: floorEntities,
      self: selfEntities,
    };

    function addUiData(entityId: string, indent: number): Entity[] {
      const expanded = ui.inventoryExpandedById.includes(entityId);
      const newEntity = {
        ...entities[entityId],
        indent,
        selected: ui.selectedItems.includes(entityId),
        expanded,
      };
      if (!expanded) {
        return [newEntity];
      }
      return [newEntity].concat(
        flatMap(newEntity.entities, id => addUiData(id, indent + 1)),
      );
    }

    function entityIds(owner: "self" | "floor"): string[] {
      if (owner === "self") {
        return ui.player ? entities[ui.player].entities : [];
      } else if (owner === "floor") {
        return location.entities || [];
      }
      return [];
    }
  },
);
