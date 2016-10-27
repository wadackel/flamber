// @flow
import { normalize } from "normalizr";
import { takeEvery } from "redux-saga";
import { fork, call, put, take, select } from "redux-saga/effects";
import BoardSchema from "../../schemas/board";
import * as Services from "../../services/boards";
import { showNotify } from "../../actions/notifications";
import * as B from "../../actions/boards";
import { getBoardEntityById, getSelectedBoardEntities } from "../../selectors/boards";

import type {
  Boards,
  BoardEntity,
  BoardEntities,
  DeleteBoardRequestAction,
  DeleteBoardSuccessAction,
  DeleteBoardFailureAction
} from "../../types/board";


export function *handleDeleteBoardRequest(): Generator<any, *, *> {
  while (true) {
    let entity: ?BoardEntity = null;

    try {
      const action: ?DeleteBoardRequestAction = yield take(B.DELETE_BOARD_REQUEST);
      if (!action) throw new Error("ボードの削除に失敗しました");

      entity = yield select(getBoardEntityById, action.payload);
      if (!entity) throw new Error("ボードの削除に失敗しました");

      const validEntity: BoardEntity = entity;
      const response = yield call((): Promise<{ boards: Boards }> => Services.deleteBoards([validEntity]));
      if (!response) throw new Error(`${validEntity.name} の削除に失敗しました`);

      const normalized = normalize({ board: response[0] }, { board: BoardSchema });
      yield put(B.deleteBoardSuccess(normalized));

    } catch (error) {
      yield put(B.deleteBoardFailure(error, entity));
    }
  }
}

function *handleDeleteBoardSuccess(action: DeleteBoardSuccessAction): Generator<any, *, *> {
  const entity = action.payload.entities.boards[action.payload.result.board];
  yield put(showNotify(`${entity.name}を削除しました`));
}

function *handleDeleteBoardFailure(action: DeleteBoardFailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}


// TODO: Type definition
export function *handleSelectedBoardsDeleteRequest(): Generator<any, *, *> {
  while (true) {
    yield take(B.SELECTED_BOARDS_DELETE_REQUEST);
    const entities: ?BoardEntities = yield select(getSelectedBoardEntities);

    try {
      if (!entities) throw new Error("選択したボードの削除に失敗しました");

      const response = yield call((): Promise<{ boards: Boards }> => Services.deleteBoards(entities));
      yield put(B.selectedBoardsDeleteSuccess(response));

    } catch (error) {
      yield put(B.selectedBoardsDeleteFailure(error, entities));
    }
  }
}

function *handleSelectedBoardsDeleteSuccess(action: any): Generator<any, *, *> {
  yield put(showNotify(`${action.payload.length}個のボードを削除しました`));
}

function *handleSelectedBoardsDeleteFailure(): Generator<any, *, *> {
  // TODO: More error message
  yield put(showNotify("選択したボードの削除に失敗しました"));
}


export default function *deleteBoardSaga(): Generator<any, *, *> {
  yield [
    fork(handleDeleteBoardRequest),
    takeEvery(B.DELETE_BOARD_SUCCESS, handleDeleteBoardSuccess),
    takeEvery(B.DELETE_BOARD_FAILURE, handleDeleteBoardFailure),
    fork(handleSelectedBoardsDeleteRequest),
    takeEvery(B.SELECTED_BOARDS_DELETE_SUCCESS, handleSelectedBoardsDeleteSuccess),
    takeEvery(B.SELECTED_BOARDS_DELETE_FAILURE, handleSelectedBoardsDeleteFailure)
  ];
}
