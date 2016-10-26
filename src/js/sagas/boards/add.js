// @flow
import { normalize } from "normalizr";
import { push } from "react-router-redux";
import { takeEvery } from "redux-saga";
import { call, put } from "redux-saga/effects";
import BoardSchema from "../../schemas/board";
import * as Services from "../../services/boards";
import { showNotify } from "../../actions/notifications";
import * as B from "../../actions/boards";

import type {
  Board,
  AddBoardRequestAction,
  AddBoardSuccessAction,
  AddBoardFailureAction,
  GotoAddedBoardAction
} from "../../types/board";


export function *handleAddBoardRequest(action: AddBoardRequestAction): Generator<any, *, *> {
  try {
    const { name, secret } = action.payload;
    const response = yield call((): Promise<{ board: Board }> => Services.addBoard(name, secret));
    if (!response) throw new Error("ボードの追加に失敗しました");

    const normalized = normalize(response, { board: BoardSchema });
    yield put(B.addBoardSuccess(normalized));

  } catch (error) {
    yield put(B.addBoardFailure(error));
  }
}

function *handleAddBoardSuccess(action: AddBoardSuccessAction): Generator<any, *, *> {
  yield put(showNotify("ボードを追加しました", {
    type: B.GOTO_ADDED_BOARD,
    text: "Show",
    payload: action.payload.result.board
  }));
}

function *handleGotoAddedBoard(action: GotoAddedBoardAction): Generator<any, *, *> {
  yield put(push(`/app/board/${action.payload}`));
}

function *handleAddBoardFailure(action: AddBoardFailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}


export default function *addBoardSaga(): Generator<any, *, *> {
  yield [
    takeEvery(B.ADD_BOARD_REQUEST, handleAddBoardRequest),
    takeEvery(B.ADD_BOARD_SUCCESS, handleAddBoardSuccess),
    takeEvery(B.ADD_BOARD_FAILURE, handleAddBoardFailure),
    takeEvery(B.GOTO_ADDED_BOARD, handleGotoAddedBoard)
  ];
}
