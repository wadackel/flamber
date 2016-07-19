import { fork, take, put, call } from "redux-saga/effects";
import { fetchBoards } from "../api/boards";
import * as Boards from "../actions/boards";

export function *handleFetchBoardsRequest() {
  while (true) {
    yield take(Boards.FETCH_BOARDS_REQUEST);

    try {
      const boards = yield call(fetchBoards);
      yield put(Boards.fetchBoardsSuccess(boards));
    } catch (err) {
      yield put(Boards.fetchBoardsFailure(err));
    }
  }
}

export default function *rootSaga() {
  yield [
    fork(handleFetchBoardsRequest)
  ];
}
