// @flow
import { takeEvery, delay } from "redux-saga";
import { fork, take, call, put, cancel } from "redux-saga/effects";
import * as Services from "../../services/settings";
import * as O from "../../actions/options";

import type {
  UpdateBoardsLayoutRequestAction,
  UpdateItemsLayoutRequestAction,
  UpdateItemsSizeRequestAction
} from "../../types/options";


function *callUpdateSettings<T>(
  key: string,
  value: T,
  success: Function,
  failure: Function,
  errorMessage: string): Generator<any, *, *> {

  try {
    const response = yield call((): Promise<{ [key: string]: T }> => Services.updateSettings(key, value));
    if (!response) throw new Error(errorMessage);
    yield put(success(response[key]));

  } catch (error) {
    yield put(failure(error));
  }
}


export function *handleBoardsLayoutRequest(action: UpdateBoardsLayoutRequestAction): Generator<any, *, *> {
  yield callUpdateSettings(
    "boardsLayout",
    action.payload,
    O.updateBoardsLayoutSuccess,
    O.updateBoardsLayoutFailure,
    "ボードのレイアウト変更に失敗しました"
  );
}


export function *handleItemsLayoutRequest(action: UpdateItemsLayoutRequestAction): Generator<any, *, *> {
  yield callUpdateSettings(
    "itemsLayout",
    action.payload,
    O.updateItemsLayoutSuccess,
    O.updateItemsLayoutFailure,
    "アイテムのレイアウト変更に失敗しました"
  );
}


export function *handleItemsSizeRequestDebounced(size: number): Generator<any, *, *> {
  yield call(delay, 500);
  yield put(O.updateItemsSizeRequestDebounced(size));

  yield callUpdateSettings(
    "itemsSize",
    size,
    O.updateItemsSizeSuccess,
    O.updateItemsSizeFailure,
    "アイテムの表示サイズ変更に失敗しました"
  );
}

export function *watchItemsSize(): Generator<any, *, *> {
  let task = null;

  while (true) {
    const action: ?UpdateItemsSizeRequestAction = yield take(O.UPDATE_ITEMS_SIZE_REQUEST);

    if (task) {
      yield cancel(task);
    }

    if (action) {
      task = yield fork(handleItemsSizeRequestDebounced, action.payload);
    }
  }
}


export default function *settingsSaga(): Generator<any, *, *> {
  yield [
    takeEvery(O.UPDATE_BOARDS_LAYOUT_REQUEST, handleBoardsLayoutRequest),
    takeEvery(O.UPDATE_ITEMS_LAYOUT_REQUEST, handleItemsLayoutRequest),
    fork(watchItemsSize)
  ];
}
