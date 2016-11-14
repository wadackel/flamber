// @flow
import { normalize, arrayOf } from "normalizr";
import { takeEvery, takeLatest } from "redux-saga";
import { call, put } from "redux-saga/effects";
import ItemSchema from "../../schemas/item";
import * as Services from "../../services/items";
import { showNotify } from "../../actions/notifications";
import * as I from "../../actions/items";
import * as T from "../../actions/tags";

import type { Items, FetchItemsFailureAction } from "../../types/item";


export function *handleFetchItemsRequest(): Generator<any, *, *> {
  try {
    const response = yield call((): Promise<{ items: Items }> => Services.fetchItems());
    if (!response) throw new Error("アイテムの取得に失敗しました");

    const normalized = normalize(response, { items: arrayOf(ItemSchema) });
    yield put(I.fetchItemsSuccess(normalized));

  } catch (error) {
    yield put(I.fetchItemsFailure(error));
  }
}

function *handleFetchItemsFailure(action: FetchItemsFailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}


export function *handleDeleteTagSuccess(): Generator<any, *, *> {
  yield put(I.fetchItemsRequest());
}


export default function *fetchItemSaga(): Generator<any, *, *> {
  yield [
    takeLatest(I.FETCH_ITEMS_REQUEST, handleFetchItemsRequest),
    takeEvery(I.FETCH_ITEMS_FAILURE, handleFetchItemsFailure),

    // Remove tag
    takeEvery(T.DELETE_TAG_SUCCESS, handleDeleteTagSuccess)
  ];
}
