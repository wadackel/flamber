import { takeLatest } from "redux-saga";
import { fork, take, put, call, select } from "redux-saga/effects";
import { fetchSettings, updateSettings } from "../api/settings";
import * as Settings from "../actions/settings";
import { getSettings } from "../selectors/settings";

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

function *callUpdateSettings(key, value) {
  const settings = yield select(getSettings);
  const newSettings = {
    ...settings,
    [key]: value
  };

  return yield call(updateSettings, newSettings);
}

export function *handleUpdateThemeRequest(action) {
  try {
    const settings = yield callUpdateSettings("theme", action.payload);
    yield put(Settings.updateThemeSuccess(settings.theme));
  } catch (err) {
    yield put(Settings.updateThemeFailure(err));
  }
}

export function *handleUpdateBoardsLayoutRequest(action) {
  try {
    const settings = yield callUpdateSettings("boardsLayout", action.payload);
    yield put(Settings.updateBoardsLayoutSuccess(settings.boardsLayout));
  } catch (err) {
    yield put(Settings.updateBoardsLayoutFailure(err));
  }
}

export function *handleUpdateItemsLayoutRequest(action) {
  try {
    const settings = yield callUpdateSettings("itemsLayout", action.payload);
    yield put(Settings.updateItemsLayoutSuccess(settings.itemsLayout));
  } catch (err) {
    yield put(Settings.updateItemsLayoutFailure(err));
  }
}

export function *handleUpdateItemsSizeRequest(action) {
  try {
    const settings = yield callUpdateSettings("itemsSize", action.payload);
    yield put(Settings.updateItemsSizeSuccess(settings.itemsSize));
  } catch (err) {
    yield put(Settings.updateItemsSizeFailure(err));
  }
}

export function *watchUpdateSettingsRequest() {
  yield [
    takeLatest(Settings.UPDATE_THEME_REQUEST, handleUpdateThemeRequest),
    takeLatest(Settings.UPDATE_BOARDS_LAYOUT_REQUEST, handleUpdateBoardsLayoutRequest),
    takeLatest(Settings.UPDATE_ITEMS_LAYOUT_REQUEST, handleUpdateItemsLayoutRequest),
    takeLatest(Settings.UPDATE_ITEMS_SIZE_REQUEST, handleUpdateItemsSizeRequest)
  ];
}

export default function *rootSaga() {
  yield [
    fork(handleFetchSettingsRequest),
    fork(watchUpdateSettingsRequest)
  ];
}
