import { takeLatest, delay } from "redux-saga";
import { fork, take, put, call, select, cancel } from "redux-saga/effects";
import { fetchSettings, updateSettings } from "../services/settings";
import * as Settings from "../actions/settings";
import { getSettings } from "../selectors/settings";


// Fetch
export function *handleFetchSettingsRequest() {
  while (true) {
    yield take(Settings.FETCH_SETTINGS_REQUEST);

    try {
      const settings = yield call(fetchSettings);
      yield put(Settings.fetchSettingsSuccess(settings));
    } catch (error) {
      yield put(Settings.fetchSettingsFailure(error));
    }
  }
}


// Update
function *callUpdateSettings(key, value, success, failure) {
  const settings = yield select(getSettings);
  const newSettings = {
    ...settings,
    [key]: value
  };

  try {
    const response = yield call(updateSettings, newSettings);
    yield put(success(response[key]));
  } catch (error) {
    yield put(failure(error));
  }
}

export function *handleUpdateThemeRequest({ payload }) {
  yield callUpdateSettings(
    "theme",
    payload,
    Settings.updateThemeSuccess,
    Settings.updateThemeFailure
  );
}

export function *handleUpdateBoardsLayoutRequest({ payload }) {
  yield callUpdateSettings(
    "boardsLayout",
    payload,
    Settings.updateBoardsLayoutSuccess,
    Settings.updateBoardsLayoutFailure
  );
}

export function *handleUpdateItemsLayoutRequest({ payload }) {
  yield callUpdateSettings(
    "itemsLayout",
    payload,
    Settings.updateItemsLayoutSuccess,
    Settings.updateItemsLayoutFailure
  );
}

export function *handleUpdateItemsSizeRequest(size) {
  yield call(delay, 500);
  yield put(Settings.updateItemsSizeRequest(size));

  yield callUpdateSettings(
    "itemsSize",
    size,
    Settings.updateItemsSizeSuccess,
    Settings.updateItemsSizeFailure
  );
}

export function *watchItemsSize() {
  let task = null;
  while (true) {
    const { payload } = yield take(Settings.UPDATE_ITEMS_SIZE_REQUEST_DEBOUNCE);
    if (task) {
      yield cancel(task);
    }
    task = yield fork(handleUpdateItemsSizeRequest, payload);
  }
}

export function *handleUpdateItemsOrderByRequest({ payload }) {
  yield callUpdateSettings(
    "itemsOrderBy",
    payload,
    Settings.updateItemsOrderBySuccess,
    Settings.updateItemsOrderByFailure
  );
}

export function *handleUpdateItemsOrderRequest({ payload }) {
  yield callUpdateSettings(
    "itemsOrder",
    payload,
    Settings.updateItemsOrderSuccess,
    Settings.updateItemsOrderFailure
  );
}

export function *handleUpdateBoardsOrderByRequest({ payload }) {
  yield callUpdateSettings(
    "boardsOrderBy",
    payload,
    Settings.updateBoardsOrderBySuccess,
    Settings.updateBoardsOrderByFailure
  );
}

export function *handleUpdateBoardsOrderRequest({ payload }) {
  yield callUpdateSettings(
    "boardsOrder",
    payload,
    Settings.updateBoardsOrderSuccess,
    Settings.updateBoardsOrderFailure
  );
}

export function *watchUpdateSettingsRequest() {
  yield [
    takeLatest(Settings.UPDATE_THEME_REQUEST, handleUpdateThemeRequest),
    takeLatest(Settings.UPDATE_BOARDS_LAYOUT_REQUEST, handleUpdateBoardsLayoutRequest),
    takeLatest(Settings.UPDATE_ITEMS_LAYOUT_REQUEST, handleUpdateItemsLayoutRequest),
    fork(watchItemsSize),
    takeLatest(Settings.UPDATE_ITEMS_ORDER_BY_REQUEST, handleUpdateItemsOrderByRequest),
    takeLatest(Settings.UPDATE_ITEMS_ORDER_REQUEST, handleUpdateItemsOrderRequest),
    takeLatest(Settings.UPDATE_BOARDS_ORDER_BY_REQUEST, handleUpdateBoardsOrderByRequest),
    takeLatest(Settings.UPDATE_BOARDS_ORDER_REQUEST, handleUpdateBoardsOrderRequest)
  ];
}


export default function *settingsSaga() {
  yield [
    fork(handleFetchSettingsRequest),
    fork(watchUpdateSettingsRequest)
  ];
}
