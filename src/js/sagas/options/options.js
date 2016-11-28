// @flow
import { takeLatest, delay } from "redux-saga";
import { fork, take, call, put, cancel } from "redux-saga/effects";
import * as Services from "../../services/options";
import * as A from "../../actions/auth";
import * as O from "../../actions/options";
import normalizeOptions from "../../utils/normalize-options";

import type {
  Options,
  UpdateBoardsLayoutRequestAction,
  UpdateBoardsOrderByRequestAction,
  UpdateBoardsOrderRequestAction,
  UpdateItemsLayoutRequestAction,
  UpdateItemsSizeRequestAction,
  UpdateItemsOrderByRequestAction,
  UpdateItemsOrderRequestAction
} from "../../types/options";


export function *handleFetchOptionsRequest(): Generator<any, *, *> {
  try {
    const response = yield call((): Promise<{ options: Options }> => Services.fetchOptions());
    if (!response) throw new Error("オプションの取得に失敗しました");

    const options = normalizeOptions(response);
    yield put(O.fetchOptionsSuccess(options));

  } catch (error) {
    yield put(O.fetchOptionsFailure(error));
  }
}


function *callUpdateOption<T>(
  key: string,
  value: T,
  success: Function,
  failure: Function,
  errorMessage: string): Generator<any, *, *> {

  try {
    const response = yield call((): Promise<{ [key: string]: T }> => Services.updateOption(key, value));
    if (!response) throw new Error(errorMessage);
    yield put(success(response[key]));

  } catch (error) {
    yield put(failure(error));
  }
}


export function *handleBoardsLayoutRequest(action: UpdateBoardsLayoutRequestAction): Generator<any, *, *> {
  yield callUpdateOption(
    "boardsLayout",
    action.payload,
    O.updateBoardsLayoutSuccess,
    O.updateBoardsLayoutFailure,
    "ボードのレイアウト変更に失敗しました"
  );
}


export function *handleBoardsOrderByRequest(action: UpdateBoardsOrderByRequestAction): Generator<any, *, *> {
  yield callUpdateOption(
    "boardsOrderBy",
    action.payload,
    O.updateBoardsOrderBySuccess,
    O.updateBoardsOrderByFailure,
    "ボードの表示順序の変更に失敗しました"
  );
}


export function *handleBoardsOrderRequest(action: UpdateBoardsOrderRequestAction): Generator<any, *, *> {
  yield callUpdateOption(
    "boardsOrder",
    action.payload,
    O.updateBoardsOrderSuccess,
    O.updateBoardsOrderFailure,
    "ボードの表示順序の変更に失敗しました"
  );
}


export function *handleItemsLayoutRequest(action: UpdateItemsLayoutRequestAction): Generator<any, *, *> {
  yield callUpdateOption(
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

  yield callUpdateOption(
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


export function *handleItemsOrderByRequest(action: UpdateItemsOrderByRequestAction): Generator<any, *, *> {
  yield callUpdateOption(
    "itemsOrderBy",
    action.payload,
    O.updateItemsOrderBySuccess,
    O.updateItemsOrderByFailure,
    "アイテムの表示順序の変更に失敗しました"
  );
}


export function *handleItemsOrderRequest(action: UpdateItemsOrderRequestAction): Generator<any, *, *> {
  yield callUpdateOption(
    "itemsOrder",
    action.payload,
    O.updateItemsOrderSuccess,
    O.updateItemsOrderFailure,
    "アイテムの表示順序の変更に失敗しました"
  );
}


export default function *optionsSaga(): Generator<any, *, *> {
  yield [
    takeLatest([
      A.FETCH_CURRENT_USER_SUCCESS,
      O.FETCH_OPTIONS_REQUEST
    ], handleFetchOptionsRequest),

    takeLatest(O.UPDATE_BOARDS_LAYOUT_REQUEST, handleBoardsLayoutRequest),
    takeLatest(O.UPDATE_BOARDS_ORDER_BY_REQUEST, handleBoardsOrderByRequest),
    takeLatest(O.UPDATE_BOARDS_ORDER_REQUEST, handleBoardsOrderRequest),
    takeLatest(O.UPDATE_ITEMS_LAYOUT_REQUEST, handleItemsLayoutRequest),
    fork(watchItemsSize),
    takeLatest(O.UPDATE_ITEMS_ORDER_BY_REQUEST, handleItemsOrderByRequest),
    takeLatest(O.UPDATE_ITEMS_ORDER_REQUEST, handleItemsOrderRequest)
  ];
}
