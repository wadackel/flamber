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
import * as Notifications from "../actions/notifications";
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

function *handleAddBoardSuccess() {
  yield put(Notifications.showNotify("ボードを追加しました", {
    type: Boards.GOTO_ADDED_BOARD,
    text: "Show"
  }));
}

function *handleGotoAddedBoard() {
  // TODO
}

function *handleAddBoardFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("ボードの追加に失敗しました"));
}

export function *addBoardSaga() {
  yield [
    takeEvery(Boards.ADD_BOARD_REQUEST, handleAddBoardRequest),
    takeEvery(Boards.ADD_BOARD_SUCCESS, handleAddBoardSuccess),
    takeEvery(Boards.ADD_BOARD_FAILURE, handleAddBoardFailure),
    takeEvery(Boards.GOTO_ADDED_BOARD, handleGotoAddedBoard)
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
    yield put(Boards.updateBoardFailure(error, payload));
  }
}

function *handleUpdateBoardFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("ボードの更新に失敗しました"));
}

export function *updateBoardSaga() {
  yield [
    takeEvery(Boards.UPDATE_BOARD_IF_NEEDED, handleUpdateBoardIfNeeded),
    takeEvery(Boards.UPDATE_BOARD_REQUEST, handleUpdateBoardRequest),
    takeEvery(Boards.UPDATE_BOARD_FAILURE, handleUpdateBoardFailure)
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

function *handleDeleteBoardSuccess({ payload }) {
  yield put(Notifications.showNotify(`${payload.name}を削除しました`));
}

function *handleDeleteBoardFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("ボードの削除に失敗しました"));
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

function *handleSelectedBoardsDeleteSuccess({ payload }) {
  yield put(Notifications.showNotify(`${payload.length}個のボードを削除しました`));
}

function *handleSelectedBoardsDeleteFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("選択したボードの削除に失敗しました"));
}

export function *deleteBoardSaga() {
  yield [
    fork(handleDeleteBoardRequest),
    takeEvery(Boards.DELETE_BOARD_SUCCESS, handleDeleteBoardSuccess),
    takeEvery(Boards.DELETE_BOARD_FAILURE, handleDeleteBoardFailure),
    fork(handleSelectedBoardsDeleteRequest),
    takeEvery(Boards.SELECTED_BOARDS_DELETE_SUCCESS, handleSelectedBoardsDeleteSuccess),
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
