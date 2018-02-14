import { Entity, EntityState } from "../models";

export function pathArray(
  path: string,
  userId: string,
  locationId: string,
): string[] {
  return path
    .replace(/^self/, userId)
    .replace(/^floor/, locationId)
    .split("/");
}

export function findIn(
  pathArray: string[],
  entities: EntityState,
): Entity | null {
  const resultId = pathArray.slice(1).reduce((parentId, name, index) => {
    if (!parentId) {
      return;
    }
    return entities[parentId].entities.find(id => {
      return entities[id].name === name;
    });
  }, pathArray[0]);
  return resultId ? entities[resultId] : null;
}
