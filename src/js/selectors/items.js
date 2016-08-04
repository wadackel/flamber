/* eslint-disable */
import _ from "lodash";

export function getItemEntities(state) {
  return state.items.results.map(id => state.entities.items[id]);
}
