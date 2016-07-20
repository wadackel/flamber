import { fork, take, put, call } from "redux-saga/effects";
import { fetchBoards, addBoard } from "../api/boards";
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

export function *handleAddBoardRequest() {
  while (true) {
    const action = yield take(Boards.ADD_BOARD_REQUEST);

    try {
      const board = yield call(addBoard, action.payload);
      yield put(Boards.addBoardSuccess(board));
    } catch (err) {
      yield put(Boards.ADD_BOARD_FAILURE(err));
    }
  }
}

export default function *rootSaga() {
  yield [
    fork(handleFetchBoardsRequest),
    fork(handleAddBoardRequest)
  ];
}
