import { takeLatest } from "redux-saga";
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

export function *handleUpdateSettingsRequest(action) {
  try {
    const settings = yield call(updateSettings, action.payload);
    yield put(Settings.updateSettingsSuccess(settings));
  } catch (err) {
    yield put(Settings.updateSettingsFailure(err));
  }
}

export function *watchUpdateSettingsRequest() {
  yield *takeLatest(Settings.UPDATE_SETTINGS_REQUEST, handleUpdateSettingsRequest);
}

export default function *rootSaga() {
  yield [
    fork(handleFetchSettingsRequest),
    fork(watchUpdateSettingsRequest)
  ];
}
