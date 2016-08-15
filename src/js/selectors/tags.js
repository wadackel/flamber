export function getTagEntityById(state, id) {
  return state.entities.tags[id];
}

export function getTagEntities(state) {
  return state.tags.results.map(id => getTagEntityById(state, id));
}
