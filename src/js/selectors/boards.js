import _ from "lodash";

export function boardSelectorByBoards(boards, id) {
  const board = _.find(boards.entities, o => o.id === id);

  if (board) {
    return board;
  } else if (boards.board && boards.board.id === id) {
    return boards.board;
  }

  return null;
}

export function boardSelector(state, id) {
  return boardSelectorByBoards(state.boards, id);
}

export function itemSelectorByBoards(boards, id) {
  let item = null;

  _.forEach(boards.entities, board => {
    const res = _.find(board.items, o => o.id === id);

    if (res) {
      item = res;

      return false;
    }
  });

  return item;
}

export function itemSelector(state, id) {
  return itemSelectorByBoards(state.boards, id);
}
