// @flow
import { takeEvery } from "redux-saga";
import { call, put } from "redux-saga/effects";
import * as Services from "../../services/settings";
import * as O from "../../actions/options";

import type {
  UpdateBoardsLayoutRequestAction,
  UpdateItemsLayoutRequestAction
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


export default function *settingsSaga(): Generator<any, *, *> {
  yield [
    takeEvery(O.UPDATE_BOARDS_LAYOUT_REQUEST, handleBoardsLayoutRequest),
    takeEvery(O.UPDATE_ITEMS_LAYOUT_REQUEST, handleItemsLayoutRequest)
  ];
}
