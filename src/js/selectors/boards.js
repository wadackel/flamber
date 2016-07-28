import _ from "lodash";

export function boardSelectorByBoards(boards, id) {
  return _.find(boards.entities, o => o._id === id);
}

export function boardSelector(state, id) {
  return boardSelectorByBoards(state.boards, id);
}

export function itemSelectorByBoards(boards, id) {
  let item = null;

  _.forEach(boards.entities, board => {
    const res = _.find(board.items, o => o._id === id);

    if (res) {
      item = res;

      return false;
    }
  });

  return item;
}

export function getCurrentBoardByBoards(boards) {
  return _.find(boards.entities, o => o._id === boards.currentBoardId);
}

export function getCurrentBoard(state) {
  return getCurrentBoardByBoards(state.boards);
}
