import deepEqual from "deep-equal";
import { normalize, arrayOf } from "normalizr";
import { takeEvery } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import BoardSchema from "../../schemas/board";
import * as Services from "../../services/boards";
import * as Notifications from "../../actions/notifications";
import * as Boards from "../../actions/boards";
import { getBoardEntityById } from "../../selectors/boards";


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


export default function *updateBoardSaga() {
  yield [
    takeEvery(Boards.UPDATE_BOARD_IF_NEEDED, handleUpdateBoardIfNeeded),
    takeEvery(Boards.UPDATE_BOARD_REQUEST, handleUpdateBoardRequest),
    takeEvery(Boards.UPDATE_BOARD_FAILURE, handleUpdateBoardFailure)
  ];
}
