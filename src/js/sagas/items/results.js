import { takeEvery } from "redux-saga";
import { take, select } from "redux-saga/effects";
import * as Boards from "../../actions/boards";
import { getCurrentBoard } from "../../selectors/boards";
import { setItemResultsByBoardId } from "./helpers";

export function *handleSetCurrentBoard() {
  let board = yield select(getCurrentBoard);

  if (!board) {
    yield take(Boards.FETCH_BOARDS_SUCCESS);
    board = yield select(getCurrentBoard);
  }

  if (!board) return;
  yield setItemResultsByBoardId(board.id);
}

export default function *resultsItemSaga() {
  yield [
    takeEvery(Boards.SET_CURRENT_BOARD, handleSetCurrentBoard)
  ];
}
