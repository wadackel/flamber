import _ from "lodash";

export function getItemByIdFromItems(items, id) {
  return _.find(items.entities, o => o._id === id);
}

export function getItemById(state, id) {
  return getItemByIdFromItems(state.items, id);
}
