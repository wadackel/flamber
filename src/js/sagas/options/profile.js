// @flow
import { takeEvery } from "redux-saga";
import { put, call, take, fork } from "redux-saga/effects";
import * as Options from "../../actions/options";
import * as Notifications from "../../actions/notifications";
import * as Services from "../../services/profile";

import type { User } from "../../types/user";
import type { UpdateProfileRequestAction } from "../../types/options";

export function *handleUpdateProfileRequest(): Generator<any, void, any> {
  while (true) {
    try {
      const action: ?UpdateProfileRequestAction = yield take(Options.UPDATE_PROFILE_REQUEST);
      if (!action) throw new Error("TODO");

      const { id, photo, name } = action.payload;

      if (!name) throw new Error("TODO");
      const response = yield call((): Promise<{ user: User }> => Services.updateProfile(id, photo, name));

      if (!response || !response.user) throw new Error("TODO");
      yield put(Options.updateProfileSuccess(response.user));

    } catch (error) {
      yield put(Options.updateProfileFailure(error));
    }
  }
}

function *handleUpdateProfileSuccess(): Generator<any, *, *> {
  yield put(Notifications.showNotify("プロフィールを更新しました"));
}

// TODO: More message
function *handleUpdateProfileFailure(): Generator<any, *, *> {
  yield put(Notifications.showNotify("プロフィールの更新に失敗しました"));
}

export default function *profileSaga(): Generator<any, void, void> {
  yield [
    fork(handleUpdateProfileRequest),
    takeEvery(Options.UPDATE_PROFILE_SUCCESS, handleUpdateProfileSuccess),
    takeEvery(Options.UPDATE_PROFILE_FAILURE, handleUpdateProfileFailure)
  ];
}
