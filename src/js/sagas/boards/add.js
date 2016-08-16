import { normalize } from "normalizr";
import { push } from "react-router-redux";
import { takeEvery } from "redux-saga";
import { call, put } from "redux-saga/effects";
import BoardSchema from "../../schemas/board";
import * as Services from "../../services/boards";
import * as Notifications from "../../actions/notifications";
import * as Boards from "../../actions/boards";


export function *handleAddBoardRequest({ payload }) {
  try {
    const response = yield call(Services.addBoard, payload);
    const normalized = normalize(response, {
      board: BoardSchema
    });
    yield put(Boards.addBoardSuccess(normalized));
  } catch (error) {
    yield put(Boards.addBoardFailure(error));
  }
}

function *handleAddBoardSuccess({ payload }) {
  yield put(Notifications.showNotify("ボードを追加しました", {
    type: Boards.GOTO_ADDED_BOARD,
    text: "Show",
    payload: payload.result.board
  }));
}

function *handleGotoAddedBoard({ payload }) {
  yield put(push(`/app/board/${payload}`));
}

function *handleAddBoardFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("ボードの追加に失敗しました"));
}


export default function *addBoardSaga() {
  yield [
    takeEvery(Boards.ADD_BOARD_REQUEST, handleAddBoardRequest),
    takeEvery(Boards.ADD_BOARD_SUCCESS, handleAddBoardSuccess),
    takeEvery(Boards.ADD_BOARD_FAILURE, handleAddBoardFailure),
    takeEvery(Boards.GOTO_ADDED_BOARD, handleGotoAddedBoard)
  ];
}
