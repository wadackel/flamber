/* eslint-disable */
import _ from "lodash";
import deepEqual from "deep-equal";
import { normalize, arrayOf } from "normalizr";
import { takeEvery } from "redux-saga";
import { fork, take, put, call, select } from "redux-saga/effects";
import BoardSchema from "../schemas/board";
import ItemSchema from "../schemas/item";
import {
  getBoardEntityById,
  getSelectedBoardEntities,
  getBoardById
} from "../selectors/boards";
import * as Services from "../services/boards";
import * as Errors from "../actions/errors";
import * as Boards from "../actions/boards";
import * as Items from "../actions/items";

const boardSchema = BoardSchema.define({
  items: arrayOf(ItemSchema)
});

export function *handleFetchBoardsRequest() {
  while (true) {
    yield take(Boards.FETCH_BOARDS_REQUEST);

    try {
      const response = yield call(Services.fetchBoards);
      const normalized = normalize(response, {
        boards: arrayOf(BoardSchema)
      });
      yield put(Boards.fetchBoardsSuccess(normalized));
    } catch (error) {
      yield put(Boards.fetchBoardsFailure(error));
    }
  }
}


export function *handleAddBoardRequest({ payload }) {
  try {
    const response = yield call(Services.addBoard, payload);
    const normalized = normalize(response, BoardSchema);
    yield put(Boards.addBoardSuccess(normalized));
  } catch (error) {
    yield put(Boards.addBoardFailure(error));
  }
}

export function *handleAddBoardFailure() {
  // TODO: More error message
  yield put(Errors.showError("ボード追加でエラーが発生しました"));
}

export function *addBoardSaga() {
  yield [
    takeEvery(Boards.ADD_BOARD_REQUEST, handleAddBoardRequest),
    takeEvery(Boards.ADD_BOARD_FAILURE, handleAddBoardFailure)
  ];
}


export function *handleUpdateBoardIfNeeded({ payload }) {
  const entity = yield select(getBoardEntityById, payload.id);

  if (!deepEqual(entity, payload)) {
    yield put(Boards.updateBoardRequest(payload));
  }
}

export function *handleUpdateBoardRequest({ payload }) {
  try {
    const response = yield call(Services.updateBoards, [payload]);
    const normalized = normalize(response, {
      boards: arrayOf(BoardSchema)
    });

    yield put(Boards.updateBoardSuccess(normalized));
  } catch (error) {
    yield put(Boards.updateBoardFailure(error));
  }
}

export function *updateBoardSaga() {
  yield [
    takeEvery(Boards.UPDATE_BOARD_IF_NEEDED, handleUpdateBoardIfNeeded),
    takeEvery(Boards.UPDATE_BOARD_REQUEST, handleUpdateBoardRequest)
  ]
}


export function *handleDeleteBoardRequest() {
  while (true) {
    const { payload } = yield take(Boards.DELETE_BOARD_REQUEST);
    const entity = yield select(getBoardEntityById, payload);

    try {
      const [board] = yield call(Services.deleteBoards, [entity]);
      yield put(Boards.deleteBoardSuccess(board));
    } catch (error) {
      yield put(Boards.deleteBoardFailure(error, entity));
    }
  }
}

export function *handleDeleteBoardFailure() {
  // TODO: More error message
  yield put(Errors.showError("ボードの削除に失敗しました"));
}

export function *handleSelectedBoardsDeleteRequest() {
  while (true) {
    yield take(Boards.SELECTED_BOARDS_DELETE_REQUEST);
    const entities = yield select(getSelectedBoardEntities);

    try {
      const boards = yield call(Services.deleteBoards, entities);
      yield put(Boards.selectedBoardsDeleteSuccess(boards));
    } catch (error) {
      yield put(Boards.selectedBoardsDeleteFailure(error, entities));
    }
  }
}

export function *handleSelectedBoardsDeleteFailure() {
  // TODO: More error message
  yield put(Errors.showError("選択ボードの削除に失敗しました"));
}

export function *deleteBoardSaga() {
  yield [
    fork(handleDeleteBoardRequest),
    takeEvery(Boards.DELETE_BOARD_FAILURE, handleDeleteBoardFailure),
    fork(handleSelectedBoardsDeleteRequest),
    takeEvery(Boards.SELECTED_BOARDS_DELETE_FAILURE, handleSelectedBoardsDeleteFailure)
  ];
}


export default function *boardsSaga() {
  yield [
    fork(handleFetchBoardsRequest),
    fork(addBoardSaga),
    fork(updateBoardSaga),
    fork(deleteBoardSaga)
  ];
}
