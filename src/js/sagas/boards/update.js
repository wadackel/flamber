// @flow
import deepEqual from "deep-equal";
import { normalize, arrayOf } from "normalizr";
import { takeEvery } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import BoardSchema from "../../schemas/board";
import * as Services from "../../services/boards";
import { showNotify } from "../../actions/notifications";
import * as B from "../../actions/boards";
import { getBoardEntityById } from "../../selectors/boards";

import type {
  UpdateBoardIfNeededAction,
  UpdateBoardRequestAction,
  UpdateBoardFailureAction
} from "../../types/board";


export function *handleUpdateBoardIfNeeded(action: UpdateBoardIfNeededAction): Generator<any, *, *> {
  const entity = yield select(getBoardEntityById, action.payload.id);

  if (!deepEqual(entity, action.payload)) {
    yield put(B.updateBoardRequest(action.payload));
  }
}

export function *handleUpdateBoardRequest(action: UpdateBoardRequestAction): Generator<any, *, *> {
  try {
    const response = yield call(Services.updateBoards, [action.payload]);
    if (!response) throw new Error("ボードの更新に失敗しました");

    const normalized = normalize(response, { boards: arrayOf(BoardSchema) });
    yield put(B.updateBoardSuccess(normalized));

  } catch (error) {
    yield put(B.updateBoardFailure(error, action.payload));
  }
}

function *handleUpdateBoardSuccess(): Generator<any, *, *> {
  yield put(showNotify("ボードを更新しました"));
}

function *handleUpdateBoardFailure(action: UpdateBoardFailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}


export default function *updateBoardSaga(): Generator<any, *, *> {
  yield [
    takeEvery(B.UPDATE_BOARD_IF_NEEDED, handleUpdateBoardIfNeeded),
    takeEvery(B.UPDATE_BOARD_REQUEST, handleUpdateBoardRequest),
    takeEvery(B.UPDATE_BOARD_SUCCESS, handleUpdateBoardSuccess),
    takeEvery(B.UPDATE_BOARD_FAILURE, handleUpdateBoardFailure)
  ];
}
