import { fork, take, put, call } from "redux-saga/effects";
import { updateSettings } from "../api/settings";
import * as Settings from "../actions/settings";

export function *handleUpdateSettingsRequest() {
  while (true) {
    const action = yield take(Settings.UPDATE_SETTINGS_REQUEST);

    try {
      const settings = yield call(updateSettings, action.payload);
      yield put(Settings.updateSettingsSuccess(settings));

    } catch (err) {
      yield put(Settings.updateSettingsFailure(err));
    }
  }
}

export default function *rootSaga() {
  yield [
    fork(handleUpdateSettingsRequest)
  ];
}
