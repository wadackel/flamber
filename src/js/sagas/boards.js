/* eslint-disable */
import _ from "lodash";
import deepEqual from "deep-equal";
import { normalize, arrayOf } from "normalizr";
import { takeEvery } from "redux-saga";
import { fork, take, put, call, select } from "redux-saga/effects";
import BoardSchema from "../schemas/boards";
import ItemSchema from "../schemas/items";
import { getBoardById } from "../selectors/boards";
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
    const board = yield call(Services.addBoard, payload);
    yield put(Boards.addBoardSuccess(board));
  } catch (error) {
    yield put(Boards.addBoardFailure(error));
  }
}

export function *handleAddBoardSuccess({ payload }) {
  yield put(Boards.addBoard(payload));
}

export function *addBoardSaga() {
  yield [
    takeEvery(Boards.ADD_BOARD_REQUEST, handleAddBoardRequest),
    takeEvery(Boards.ADD_BOARD_SUCCESS, handleAddBoardSuccess)
  ];
}


export function *handleDeleteBoardRequest({ payload }) {
  const board = yield select(getBoardById, payload);

  try {
    const [newBoard] = yield call(Services.deleteBoards, [board]);
    yield put(Boards.deleteBoardSuccess(newBoard));
  } catch (error) {
    yield put(Boards.deleteBoardFailure(error));
  }
}

export function *handleDeleteBoardSuccess({ payload }) {
  yield put(Boards.removeBoard(payload));
}

export function *deleteBoardSaga() {
  yield [
    takeEvery(Boards.DELETE_BOARD_REQUEST, handleDeleteBoardRequest),
    takeEvery(Boards.DELETE_BOARD_SUCCESS, handleDeleteBoardSuccess)
  ];
}


export default function *boardsSaga() {
  yield [
    fork(handleFetchBoardsRequest),
    fork(addBoardSaga),
    fork(deleteBoardSaga)
  ];
}
