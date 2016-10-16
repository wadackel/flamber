// @flow
import { takeEvery } from "redux-saga";
import { put, call, take, fork } from "redux-saga/effects";
import * as Options from "../../actions/options";
import * as Notifications from "../../actions/notifications";
import * as Services from "../../services/account";

import type { Theme } from "../../types/prop-types";
import type { UpdateThemeRequestAction } from "../../types/options";

export function *handleUpdateThemeRequest(): Generator<any, void, any> {
  while (true) {
    try {
      const action: ?UpdateThemeRequestAction = yield take(Options.UPDATE_THEME_REQUEST);
      if (!action) throw new Error("TODO");

      const response = yield call((): Promise<{ theme: Theme }> => Services.updateTheme(action.payload));
      console.log(response);
      if (!response || !response.theme) throw new Error("TODO");

      yield put(Options.updateThemeSuccess(response.theme));

    } catch (error) {
      yield put(Options.updateThemeFailure(error));
    }
  }
}

function *handleUpdateThemeSuccess(): Generator<any, *, *> {
  yield put(Notifications.showNotify("テーマを更新しました"));
}

// TODO: More message
function *handleUpdateThemeFailure(): Generator<any, *, *> {
  yield put(Notifications.showNotify("テーマの更新に失敗しました"));
}

export default function *accountSaga(): Generator<any, void, void> {
  yield [
    fork(handleUpdateThemeRequest),
    takeEvery(Options.UPDATE_THEME_SUCCESS, handleUpdateThemeSuccess),
    takeEvery(Options.UPDATE_THEME_FAILURE, handleUpdateThemeFailure)
  ];
}
