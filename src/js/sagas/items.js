/* eslint-disable */
import { normalize, arrayOf } from "normalizr";
import { takeEvery, takeLatest, delay } from "redux-saga";
import { fork, take, put, call, select, race, cancel, cancelled } from "redux-saga/effects";
import BoardSchema from "../schemas/board";
import ItemSchema from "../schemas/item";
import * as Services from "../services/items";
import * as Errors from "../actions/errors";
import * as Auth from "../actions/auth";
import * as Boards from "../actions/boards";
import * as Items from "../actions/items";
import {
  getBoardEntityById
} from "../selectors/boards";
import {
  getItemEntityById,
  getSelectedItemEntities,
  getMoveItemEntities
} from "../selectors/items";


// const ITEM_SYNC_INTERVAL = 60000;
const ITEM_SYNC_INTERVAL = 10000;

ItemSchema.define({
  board: BoardSchema
});


export function *bgSync() {
  try {
    while (true) {
      yield put(Items.bgSyncItemsRequest());
      const response = yield call(Services.fetchItems);
      const normalized = normalize(response, {
        items: arrayOf(ItemSchema)
      });

      yield put(Items.bgSyncItemsSuccess(normalized));
      yield call(delay, ITEM_SYNC_INTERVAL);
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

export function *handleSelectedItemsDeleteRequest() {
  while (true) {
    const { payload } = yield take(Items.SELECTED_ITEMS_DELETE_REQUEST);
    const entities = yield select(getSelectedItemEntities);

    try {
      yield call(Services.deleteItems, entities);
      yield put(Items.selectedItemsDeleteSuccess(entities));
    } catch (error) {
      yield put(Items.selectedItemsDeleteFailure(error));
    }
  }
}

export function *deleteItemSaga() {
  yield [
    fork(handleDeleteItemRequest),
    fork(handleSelectedItemsDeleteRequest)
  ];
}


export function *handleFavoriteItemToggleRequest({ payload }) {
  const entity = yield select(getItemEntityById, payload);

  try {
    const response = yield call(Services.updateItems, [entity]);
    const normalized = normalize(response, {
      items: arrayOf(ItemSchema)
    });
    yield put(Items.favoriteItemToggleSuccess(
      normalized.entities.items[normalized.result.items[0]]
    ));
  } catch (error) {
    yield put(Items.favoriteItemToggleFailure(error, payload));
  }
}

function *handleFavoriteItemToggleFailure() {
  // TODO: Error message
  yield put(Errors.showError("アイテムの更新に失敗しました"));
}

export function *handleSelectedItemsFavoriteRequest() {
  while (true) {
    const { payload } = yield take(Items.SELECTED_ITEMS_FAVORITE_REQUEST);
    const entities = yield select(getSelectedItemEntities);
    const newEntities = entities.map(entity => ({ ...entity, favorite: payload }));

    try {
      const response = yield call(Services.updateItems, newEntities);
      const normalized = normalize(response, {
        items: arrayOf(ItemSchema)
      });
      yield put(Items.selectedItemsFavoriteSuccess(normalized));
    } catch (error) {
      yield put(Items.selectedItemsFavoriteFailure(error, entities));
    }
  }
}

function *handleSelectedItemsFavoriteFailure() {
  // TODO: Error message
  yield put(Errors.showError("選択したアイテムの更新に失敗しました"));
}

export function *favoriteItemSaga() {
  yield [
    takeEvery(Items.FAVORITE_ITEM_TOGGLE_REQUEST, handleFavoriteItemToggleRequest),
    takeEvery(Items.FAVORITE_ITEM_TOGGLE_FAILURE, handleFavoriteItemToggleFailure),
    fork(handleSelectedItemsFavoriteRequest),
    takeEvery(Items.SELECTED_ITEMS_FAVORITE_FAILURE, handleSelectedItemsFavoriteFailure)
  ];
}


export function *handleMoveItemBoardRequest() {
  while (true) {
    const { payload } = yield take(Items.MOVE_ITEM_REQUEST);
    const [entity] = yield select(getMoveItemEntities);
    const prevBoard = entity.board;
    const newEntity = { ...entity, board: payload };

    try {
      const response = yield call(Services.updateItems, [newEntity]);
      const normalized = normalize(response, { items: arrayOf(ItemSchema) });
      yield put(Items.moveItemSuccess(
        normalized,
        prevBoard
      ));
    } catch (error) {
      yield put(Items.moveItemFailure(error, entity, prevBoard, payload));
    }
  }
}

function *handleMoveItemBoardFailure() {
  yield put(Errors.showError("アイテムの移動に失敗しました"));
}

export function *handleSelectedItemsMoveRequest() {
  while (true) {
    const { payload } = yield take(Items.SELECTED_ITEMS_MOVE_REQUEST);
    const entities = yield select(getSelectedItemEntities);
    const prevBoards = entities.map(entity => entity.board);
    const newEntities = entities.map(entity => ({ ...entity, board: payload }));

    try {
      const response = yield call(Services.updateItems, newEntities);
      const normalized = normalize(response, { items: arrayOf(ItemSchema) });
      yield put(Items.selectedItemsMoveSuccess(
        normalized,
        prevBoards
      ));
    } catch (error) {
      yield put(Items.selectedItemsMoveFailure(error, entities, prevBoards, payload));
    }
  }
}

export function *moveItemSaga() {
  yield [
    fork(handleMoveItemBoardRequest),
    takeEvery(Items.MOVE_ITEM_FAILURE, handleMoveItemBoardFailure),
    fork(handleSelectedItemsMoveRequest)
  ];
}


export default function *itemsSaga() {
  yield [
    fork(bgSyncSaga),
    fork(addItemSaga),
    fork(deleteItemSaga),
    fork(favoriteItemSaga),
    fork(moveItemSaga)
  ];
}
