export function getBoardEntityById(state, id) {
  return state.entities.boards[id];
}

export function getBoardEntities(state) {
  return state.boards.results.map(id => state.entities.boards[id]);
}

export function getSelectedBoardEntities(state) {
  return getBoardEntities(state).filter(entity => entity.select);
}

export function getCurrentBoard(state) {
  return state.entities.boards[state.boards.currentBoardId];
}
