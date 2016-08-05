/* eslint-disable */
import _ from "lodash";

export function getItemEntityById(state, id) {
  return state.entities.items[id];
}

export function getItemEntities(state) {
  return state.items.results.map(id => getItemEntityById(state, id));
}
