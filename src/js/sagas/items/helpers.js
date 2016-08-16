import { put, select } from "redux-saga/effects";
import * as Items from "../../actions/items";
import { getBoardEntityById } from "../../selectors/boards";

export function *setItemResultsByBoardId(boardId) {
  const board = yield select(getBoardEntityById, boardId);
  yield put(Items.setItemResults(board.items));
}
