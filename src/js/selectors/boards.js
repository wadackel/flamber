import _ from "lodash";

export function boardSelector(state, id) {
  const { boards } = state;
  const board = _.find(boards.entities, o => o.id === id);

  if (board) {
    return board;
  } else if (boards.board && boards.board.id === id) {
    return boards.board;
  }

  return null;
}
