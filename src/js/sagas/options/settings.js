// @flow
import { takeEvery } from "redux-saga";
import { call, put } from "redux-saga/effects";
import * as Services from "../../services/settings";
import * as O from "../../actions/options";

import type { BoardsLayout } from "../../types/prop-types";
import type {
  UpdateBoardsLayoutRequestAction
} from "../../types/options";


function *handleBoardsLayoutRequest(action: UpdateBoardsLayoutRequestAction): Generator<any, *, *> {
  try {
    const response = yield call((): Promise<{ boardsLayout: BoardsLayout }> =>
      Services.updateSettings("boardsLayout", action.payload)
    );
    if (!response) throw new Error("ボードのレイアウト変更に失敗しました");
    yield put(O.updateBoardsLayoutSuccess(response.boardsLayout));

  } catch (error) {
    yield put(O.updateBoardsLayoutFailure(error));
  }
}


export default function *settingsSaga(): Generator<any, *, *> {
  yield [
    takeEvery(O.UPDATE_BOARDS_LAYOUT_REQUEST, handleBoardsLayoutRequest)
  ];
}
