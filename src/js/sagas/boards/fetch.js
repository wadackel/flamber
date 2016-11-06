// @flow
import { normalize, arrayOf } from "normalizr";
import { takeEvery } from "redux-saga";
import { call, put } from "redux-saga/effects";
import BoardSchema from "../../schemas/board";
import * as Services from "../../services/boards";
import { showNotify } from "../../actions/notifications";
import * as A from "../../actions/auth";
import * as B from "../../actions/boards";

import type {
  Board,
  Boards,
  FetchBoardsFailureAction,
  FetchBoardRequestAction,
  FetchBoardFailureAction
} from "../../types/board";


export function *handleFetchBoardsRequest(): Generator<any, *, *> {
  try {
    const response = yield call((): Promise<{ boards: Boards }> => Services.fetchBoards());
    if (!response) throw new Error("ボードの取得に失敗しました");

    const normalized = normalize(response, { boards: arrayOf(BoardSchema) });
    yield put(B.fetchBoardsSuccess(normalized));

  } catch (error) {
    yield put(B.fetchBoardsFailure(error));
  }
}

function *handleFetchBoardsFailure(action: FetchBoardsFailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}


export function *handleFetchBoardRequest(action: FetchBoardRequestAction): Generator<any, *, *> {
  try {
    const response = yield call((): Promise<{ board: Board }> => Services.fetchBoard(action.payload));
    if (!response) throw new Error("ボードの取得に失敗しました");

    const normalized = normalize(response, { board: BoardSchema });
    yield put(B.fetchBoardSuccess(normalized));

  } catch (error) {
    yield put(B.fetchBoardFailure(error));
  }
}

function *handleFetchBoardFailure(action: FetchBoardFailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}


export default function *fetchBoardSaga(): Generator<any, *, *> {
  yield [
    takeEvery([A.FETCH_CURRENT_USER_SUCCESS, B.FETCH_BOARDS_REQUEST], handleFetchBoardsRequest),
    takeEvery(B.FETCH_BOARDS_FAILURE, handleFetchBoardsFailure),
    takeEvery(B.FETCH_BOARD_REQUEST, handleFetchBoardRequest),
    takeEvery(B.FETCH_BOARD_FAILURE, handleFetchBoardFailure)
  ];
}
