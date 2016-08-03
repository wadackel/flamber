/* eslint-disable */
import _ from "lodash";
import deepEqual from "deep-equal";
import { normalize, arrayOf } from "normalizr";
import { takeEvery } from "redux-saga";
import { fork, take, put, call, select } from "redux-saga/effects";
import BoardSchema from "../schemas/board";
import ItemSchema from "../schemas/item";
import { getBoardEntityById, getBoardById } from "../selectors/boards";
import * as Services from "../services/boards";
import * as Boards from "../actions/boards";
import * as Items from "../actions/items";


export function *handleFetchBoardsRequest() {
  while (true) {
    yield take(Boards.FETCH_BOARDS_REQUEST);

    try {
      const rawBoards = yield call(Services.fetchBoards);
      const boards = normalize(rawBoards, arrayOf(BoardSchema));
      yield put(Boards.fetchBoardsSuccess(boards));
    } catch (error) {
      yield put(Boards.fetchBoardsFailure(error));
    }
  }
}


export function *handleAddBoardRequest({ payload }) {
  try {
    const rawBoard = yield call(Services.addBoard, payload);
    const boards = normalize(rawBoard, BoardSchema);
    yield put(Boards.addBoardSuccess(boards));
  } catch (error) {
    yield put(Boards.addBoardFailure(error));
  }
}

export function *addBoardSaga() {
  yield [
    takeEvery(Boards.ADD_BOARD_REQUEST, handleAddBoardRequest)
  ];
}


export function *handleDeleteBoardRequest() {
  while (true) {
    const { payload } = yield take(Boards.DELETE_BOARD_REQUEST);
    const entity = yield select(getBoardEntityById, payload);

    try {
      const [board] = yield call(Services.deleteBoards, [entity]);
      yield put(Boards.deleteBoardSuccess(board));
    } catch (error) {
      yield put(Boards.deleteBoardFailure(error));
    }
  }
}

export function *deleteBoardSaga() {
  yield [
    fork(handleDeleteBoardRequest)
  ];
}


export default function *boardsSaga() {
  yield [
    fork(handleFetchBoardsRequest),
    fork(addBoardSaga),
    fork(deleteBoardSaga)
  ];
}
