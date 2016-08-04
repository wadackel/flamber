import _ from "lodash";

export function getBoardByIdFromBoards(boards, id) {
  return _.find(boards.entities, o => o._id === id);
}

export function getBoardById(state, id) {
  return getBoardByIdFromBoards(state.boards, id);
}

export function getCurrentBoardFromBoards(boards) {
  return getBoardByIdFromBoards(boards, boards.currentBoardId);
}

export function getCurrentBoard(state) {
  return getCurrentBoardFromBoards(state.boards);
}


export function getBoardEntityById(state, id) {
  return state.entities.boards[id];
}

export function getBoardEntities(state) {
  return state.boards.results.map(id => state.entities.boards[id]);
}
