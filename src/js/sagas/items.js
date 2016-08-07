/* eslint-disable */
import { normalize, arrayOf } from "normalizr";
import { takeEvery, takeLatest, delay } from "redux-saga";
import { fork, take, put, call, select, race, cancel, cancelled } from "redux-saga/effects";
import ItemSchema from "../schemas/item";
import * as Services from "../services/items";
import * as Auth from "../actions/auth";
import * as Boards from "../actions/boards";
import * as Items from "../actions/items";
import { getItemEntityById } from "../selectors/items";


export function *bgSync() {
  try {
    while (true) {
      yield put(Items.bgSyncItemsRequest());
      const response = yield call(Services.fetchItems);
      const normalized = normalize(response, {
        items: arrayOf(ItemSchema)
      });

      yield put(Items.bgSyncItemsSuccess(normalized));
      yield call(delay, 5000);
    }
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      yield put(Items.bgSyncItemsFailure());
    }
  }
}

export function *watchBgSync() {
  while (yield take(Items.BG_SYNC_ITEMS_START)) {
    const bgSyncTask = yield fork(bgSync);
    yield take(Items.BG_SYNC_ITEMS_STOP);
    yield cancel(bgSyncTask);
  }
}

export function *bgSyncSaga() {
  yield fork(watchBgSync);

  const { authenticated } = yield select(state => state.auth);

  if (authenticated) {
    yield call(delay, 5000);
    yield put(Items.bgSyncItemsStart());

  } else {
    yield take(Auth.SIGN_IN_SUCCESS);
    yield put(Items.bgSyncItemsStart());
  }
}


export function *handleAddItemRequest() {
  while (true) {
    const { payload } = yield take(Items.ADD_ITEM_REQUEST);

    try {
      const response = yield call(Services.addItemByFile, payload);
      const normalized = normalize(response, {
        item: ItemSchema
      });
      yield put(Items.addItemSuccess(normalized));
    } catch (error) {
      yield put(Items.addItemFailure(error));
    }
  }
}

export function *addItemSaga() {
  yield [
    fork(handleAddItemRequest)
  ]
}


export function *handleDeleteItemRequest() {
  while (true) {
    const { payload } = yield take(Items.DELETE_ITEM_REQUEST);
    const entity = yield select(getItemEntityById, payload);

    try {
      yield call(Services.deleteItems, [entity]);
      yield put(Items.deleteItemSuccess(entity));
    } catch (error) {
      yield put(Items.deleteItemFailure(error));
    }
  }
}

export function *deleteItemSaga() {
  yield [
    fork(handleDeleteItemRequest)
  ];
}


export default function *itemsSaga() {
  yield [
    fork(bgSyncSaga),
    fork(addItemSaga),
    fork(deleteItemSaga)
  ];
}
