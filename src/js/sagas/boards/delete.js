import { takeEvery } from "redux-saga";
import { fork, call, put, take, select } from "redux-saga/effects";
import * as Services from "../../services/boards";
import * as Notifications from "../../actions/notifications";
import * as Boards from "../../actions/boards";
import { getBoardEntityById, getSelectedBoardEntities } from "../../selectors/boards";


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


export default function *deleteBoardSaga() {
  yield [
    fork(handleDeleteBoardRequest),
    takeEvery(Boards.DELETE_BOARD_SUCCESS, handleDeleteBoardSuccess),
    takeEvery(Boards.DELETE_BOARD_FAILURE, handleDeleteBoardFailure),
    fork(handleSelectedBoardsDeleteRequest),
    takeEvery(Boards.SELECTED_BOARDS_DELETE_SUCCESS, handleSelectedBoardsDeleteSuccess),
    takeEvery(Boards.SELECTED_BOARDS_DELETE_FAILURE, handleSelectedBoardsDeleteFailure)
  ];
}
