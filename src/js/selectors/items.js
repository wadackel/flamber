import _ from "lodash";

export function getItemById(state, id) {
  return _.find(state.items.entities, o => o._id === id);
}
