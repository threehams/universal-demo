import { createSelector } from "reselect";
import { Entity, EntityState, State } from "../models";

function addPaths(
  entity: Entity,
  entities: EntityState,
  owner: string,
  path: string,
) {
  const newPath = `${path}/${entity.name}`;
  const pathSet = { ...entity, owner, path: newPath };
  let newEntities = entities;
  entity.entities.forEach(entityId => {
    newEntities = addPaths(newEntities[entityId], newEntities, owner, newPath);
  });
  return { ...newEntities, [entity.id]: pathSet };
}

export const entitiesWithPath = createSelector(
  (state: State) => state.entities,
  (state: State) => state.ui.player,
  (state: State) => state.location,
  (entities, player, location) => {
    let newEntities = entities;
    if (player) {
      entities[player].entities.forEach(entityId => {
        newEntities = addPaths(
          newEntities[entityId],
          newEntities,
          "self",
          "self",
        );
      });
    }
    if (location) {
      location.entities.forEach(entityId => {
        newEntities = addPaths(
          newEntities[entityId],
          newEntities,
          "floor",
          "floor",
        );
      });
    }
    return newEntities;
  },
);
