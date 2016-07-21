import _ from "lodash";
import { fork, take, put, call, select } from "redux-saga/effects";
import {
  fetchBoards,
  addBoard,
  updateBoard,
  deleteBoard,
  detailBoard
} from "../api/boards";
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
      yield put(Boards.addBoardFailure(err));
    }
  }
}

export function *handleUpdateBoardRequest() {
  while (true) {
    const action = yield take(Boards.UPDATE_BOARD_REQUEST);

    try {
      const board = yield call(updateBoard, action.payload);
      yield put(Boards.updateBoardSuccess(board));
    } catch (err) {
      yield put(Boards.updateBoardFailure(err));
    }
  }
}

export function *handleDeleteBoardRequest() {
  while (true) {
    const action = yield take(Boards.DELETE_BOARD_REQUEST);

    try {
      yield call(deleteBoard, action.payload);
      yield put(Boards.deleteBoardSuccess(action.payload));
    } catch (err) {
      yield put(Boards.deleteBoardFailure(err));
    }
  }
}

export function *handleDetailBoardRequest() {
  while (true) {
    const action = yield take(Boards.DETAIL_BOARD_REQUEST);

    try {
      const { boards: { entities } } = yield select();
      const board = _.find(entities, o => o.id === action.payload);

      if (board) {
        yield put(Boards.detailBoardSuccess(board));

      } else {
        const fetchedBoard = yield call(detailBoard, action.payload);
        yield put(Boards.detailBoardSuccess(fetchedBoard));
      }
    } catch (err) {
      yield put(Boards.detailBoardFailure(err));
    }
  }
}

export default function *rootSaga() {
  yield [
    fork(handleFetchBoardsRequest),
    fork(handleAddBoardRequest),
    fork(handleUpdateBoardRequest),
    fork(handleDeleteBoardRequest),
    fork(handleDetailBoardRequest)
  ];
}
