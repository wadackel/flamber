import _ from "lodash";

export function getSelectedItemsFromItems(items) {
  return items.entities.filter(item => item.select);
}

export function getSelectedItems(state) {
  return getSelectedItemsFromItems(state.items);
}

export function getItemByIdFromItems(items, id) {
  return _.find(items.entities, o => o._id === id);
}

export function getItemById(state, id) {
  return getItemByIdFromItems(state.items, id);
}
