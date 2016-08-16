import { takeLatest, delay } from "redux-saga";
import { fork, take, put, call, select, cancel } from "redux-saga/effects";
import { fetchSettings, updateSettings } from "../services/settings";
import * as Settings from "../actions/settings";
import { getSettings } from "../selectors/settings";

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

function *callUpdateSettings(key, value) {
  const settings = yield select(getSettings);
  const newSettings = {
    ...settings,
    [key]: value
  };

  return yield call(updateSettings, newSettings);
}

export function *handleUpdateThemeRequest({ payload }) {
  try {
    const settings = yield callUpdateSettings("theme", payload);
    yield put(Settings.updateThemeSuccess(settings.theme));
  } catch (error) {
    yield put(Settings.updateThemeFailure(error));
  }
}

export function *handleUpdateBoardsLayoutRequest({ payload }) {
  try {
    const settings = yield callUpdateSettings("boardsLayout", payload);
    yield put(Settings.updateBoardsLayoutSuccess(settings.boardsLayout));
  } catch (error) {
    yield put(Settings.updateBoardsLayoutFailure(error));
  }
}

export function *handleUpdateItemsLayoutRequest({ payload }) {
  try {
    const settings = yield callUpdateSettings("itemsLayout", payload);
    yield put(Settings.updateItemsLayoutSuccess(settings.itemsLayout));
  } catch (error) {
    yield put(Settings.updateItemsLayoutFailure(error));
  }
}

export function *handleUpdateItemsSizeRequest(size) {
  yield call(delay, 500);
  yield put(Settings.updateItemsSizeRequest(size));

  try {
    const settings = yield callUpdateSettings("itemsSize", size);
    yield put(Settings.updateItemsSizeSuccess(settings.itemsSize));
  } catch (error) {
    yield put(Settings.updateItemsSizeFailure(error));
  }
}

export function *handleUpdateItemsSizeRequestDebounce() {
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
  try {
    const settings = yield callUpdateSettings("itemsOrderBy", payload);
    yield put(Settings.updateItemsOrderBySuccess(settings.itemsOrderBy));
  } catch (error) {
    yield put(Settings.updateItemsOrderByFailure(error));
  }
}

export function *handleUpdateItemsOrderRequest({ payload }) {
  try {
    const settings = yield callUpdateSettings("itemsOrder", payload);
    yield put(Settings.updateItemsOrderSuccess(settings.itemsOrder));
  } catch (error) {
    yield put(Settings.updateItemsOrderFailure(error));
  }
}

export function *handleUpdateBoardsOrderByRequest({ payload }) {
  try {
    const settings = yield callUpdateSettings("boardsOrderBy", payload);
    yield put(Settings.updateBoardsOrderBySuccess(settings.boardsOrderBy));
  } catch (error) {
    yield put(Settings.updateBoardsOrderByFailure(error));
  }
}

export function *handleUpdateBoardsOrderRequest({ payload }) {
  try {
    const settings = yield callUpdateSettings("boardsOrder", payload);
    yield put(Settings.updateBoardsOrderSuccess(settings.boardsOrder));
  } catch (error) {
    yield put(Settings.updateBoardsOrderFailure(error));
  }
}

export function *watchUpdateSettingsRequest() {
  yield [
    takeLatest(Settings.UPDATE_THEME_REQUEST, handleUpdateThemeRequest),
    takeLatest(Settings.UPDATE_BOARDS_LAYOUT_REQUEST, handleUpdateBoardsLayoutRequest),
    takeLatest(Settings.UPDATE_ITEMS_LAYOUT_REQUEST, handleUpdateItemsLayoutRequest),
    fork(handleUpdateItemsSizeRequestDebounce),
    takeLatest(Settings.UPDATE_ITEMS_ORDER_BY_REQUEST, handleUpdateItemsOrderByRequest),
    takeLatest(Settings.UPDATE_ITEMS_ORDER_REQUEST, handleUpdateItemsOrderRequest),
    takeLatest(Settings.UPDATE_BOARDS_ORDER_BY_REQUEST, handleUpdateBoardsOrderByRequest),
    takeLatest(Settings.UPDATE_BOARDS_ORDER_REQUEST, handleUpdateBoardsOrderRequest)
  ];
}

export default function *rootSaga() {
  yield [
    fork(handleFetchSettingsRequest),
    fork(watchUpdateSettingsRequest)
  ];
}
