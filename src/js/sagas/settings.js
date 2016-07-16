import { fork, take, put, call } from "redux-saga/effects";
import { fetchSettings, updateSettings } from "../api/settings";
import * as Settings from "../actions/settings";

export function *handleFetchSettingsRequest() {
  while (true) {
    yield take(Settings.FETCH_SETTINGS_REQUEST);

    try {
      const settings = yield call(fetchSettings);
      yield put(Settings.fetchSettingsSuccess(settings));
    } catch (err) {
      yield put(Settings.fetchSettingsFailure(err));
    }
  }
}

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
    fork(handleFetchSettingsRequest),
    fork(handleUpdateSettingsRequest)
  ];
}
