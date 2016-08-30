import { getItemEntityById } from "./items";

export function getTagEntityById(state, id) {
  return state.entities.tags[id];
}

export function getTagEntities(state) {
  return state.tags.results.map(id => getTagEntityById(state, id));
}

export function getTagEntitiesByItemId(state, itemId) {
  const item = getItemEntityById(state, itemId);

  return !item ? [] : item.tags.map(id => getTagEntityById(state, id));
}
