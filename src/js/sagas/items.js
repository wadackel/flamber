/* eslint-disable */
import { normalize, arrayOf } from "normalizr";
import { push } from "react-router-redux";
import { takeEvery, takeLatest, delay } from "redux-saga";
import { fork, take, put, call, select, race, cancel, cancelled } from "redux-saga/effects";
import BoardSchema from "../schemas/board";
import ItemSchema from "../schemas/item";
import * as Services from "../services/items";
import * as Notifications from "../actions/notifications";
import * as Auth from "../actions/auth";
import * as Boards from "../actions/boards";
import * as Items from "../actions/items";
import {
  getBoardEntityById,
  getCurrentBoard
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


// Background sync
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


// Add
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

export function *handleAddItemSuccess({ payload }) {
  const item = payload.entities.items[payload.result.item];
  const board = yield select(getBoardEntityById, item.board);
  const currentBoardId = yield select(state => state.boards.currentBoardId);

  if (currentBoardId && currentBoardId === board.id) {
    yield setItemResultsByBoardId(board.id);
  }

  yield put(Notifications.showNotify(`${board.name}にアイテムを追加しました`, {
    type: Items.GOTO_ADDED_ITEM,
    text: "Show"
  }));
}

function *handleGotoAddedItem() {
  // TODO
  console.log("ADD TODO");
}

function *handleAddItemFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("アイテムの追加に失敗しました"));
}

export function *addItemSaga() {
  yield [
    fork(handleAddItemRequest),
    takeEvery(Items.ADD_ITEM_SUCCESS, handleAddItemSuccess),
    takeEvery(Items.GOTO_ADDED_ITEM, handleGotoAddedItem),
    takeEvery(Items.ADD_ITEM_FAILURE, handleAddItemFailure)
  ]
}


// Delete
export function *handleDeleteItemRequest() {
  while (true) {
    const { payload } = yield take(Items.DELETE_ITEM_REQUEST);
    const entity = yield select(getItemEntityById, payload);

    try {
      yield call(Services.deleteItems, [entity]);
      yield put(Items.deleteItemSuccess(entity));
    } catch (error) {
      yield put(Items.deleteItemFailure(error, entity));
    }
  }
}

function *handleDeleteItemSuccess({ payload }) {
  yield put(Notifications.showNotify(`${payload.name}を削除しました`));
}

function *handleDeleteItemFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("アイテムの削除に失敗しました"));
}

export function *handleSelectedItemsDeleteRequest() {
  while (true) {
    const { payload } = yield take(Items.SELECTED_ITEMS_DELETE_REQUEST);
    const entities = yield select(getSelectedItemEntities);

    try {
      yield call(Services.deleteItems, entities);
      yield put(Items.selectedItemsDeleteSuccess(entities));
    } catch (error) {
      yield put(Items.selectedItemsDeleteFailure(error, entities));
    }
  }
}

function *handleSelectedItemsDeleteSuccess({ payload }) {
  yield put(Notifications.showNotify(`${payload.length}個のアイテムを削除しました`));
}

function *handleSelectedItemsDeleteFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("選択アイテムの削除に失敗しました"));
}

export function *deleteItemSaga() {
  yield [
    fork(handleDeleteItemRequest),
    takeEvery(Items.DELETE_ITEM_SUCCESS, handleDeleteItemSuccess),
    takeEvery(Items.DELETE_ITEM_FAILURE, handleDeleteItemFailure),
    fork(handleSelectedItemsDeleteRequest),
    takeEvery(Items.SELECTED_ITEMS_DELETE_SUCCESS, handleSelectedItemsDeleteSuccess),
    takeEvery(Items.SELECTED_ITEMS_DELETE_FAILURE, handleSelectedItemsDeleteFailure)
  ];
}


// Favorite
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
  // TODO: More error message
  yield put(Notifications.showNotify("アイテムの更新に失敗しました"));
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
  // TODO: More error message
  yield put(Notifications.showNotify("選択したアイテムの更新に失敗しました"));
}

export function *favoriteItemSaga() {
  yield [
    takeEvery(Items.FAVORITE_ITEM_TOGGLE_REQUEST, handleFavoriteItemToggleRequest),
    takeEvery(Items.FAVORITE_ITEM_TOGGLE_FAILURE, handleFavoriteItemToggleFailure),
    fork(handleSelectedItemsFavoriteRequest),
    takeEvery(Items.SELECTED_ITEMS_FAVORITE_FAILURE, handleSelectedItemsFavoriteFailure)
  ];
}


// Move
export function *handleMoveItemRequest() {
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

function *handleMoveItemSuccess({ payload, meta }) {
  const item = payload.entities.items[payload.result.items[0]];
  const nextBoard = yield select(getBoardEntityById, item.board);
  const currentBoard = yield select(getCurrentBoard);

  if (currentBoard && currentBoard.id === meta.prevBoard) {
    const results = currentBoard.items.filter(id => id !== item.id);
    yield put(Items.setItemResults(results));
  }

  yield put(Notifications.showNotify(`${nextBoard.name}に移動しました`, {
    type: Items.GOTO_AFTER_MOVE_ITEM_BOARD,
    text: "Show",
    payload: nextBoard.id
  }));
}

function *handleMoveItemFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("アイテムの移動に失敗しました"));
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

function *handleSelectedItemsMoveSuccess({ payload, meta }) {
  const items = payload.result.items.map(id => payload.entities.items[id]);
  const nextBoard = yield select(getBoardEntityById, items[0].board);
  const currentBoard = yield select(getCurrentBoard);

  if (currentBoard && meta.prevBoards.indexOf(currentBoard.id) > -1) {
    const results = currentBoard.items.filter(id => payload.result.items.indexOf(id) < 0);
    yield put(Items.setItemResults(results));
  }

  yield put(Notifications.showNotify(`${items.length}個のアイテムを${nextBoard.name}へ移動しました`, {
    type: Items.GOTO_AFTER_MOVE_ITEM_BOARD,
    text: "Show",
    payload: nextBoard.id
  }));
}

function *handleSelectedItemsMoveFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("選択したアイテムの移動に失敗しました"));
}

function *handleGotoAfterMoveItemBoard({ payload }) {
  yield put(push(`/app/board/${payload}`));
}

function *unselectAllItems() {
  yield put(Items.unselectAllItem());
}

export function *moveItemSaga() {
  yield [
    fork(handleMoveItemRequest),
    takeEvery(Items.MOVE_ITEM_SUCCESS, handleMoveItemSuccess),
    takeEvery(Items.MOVE_ITEM_FAILURE, handleMoveItemFailure),
    fork(handleSelectedItemsMoveRequest),
    takeEvery(Items.SELECTED_ITEMS_MOVE_SUCCESS, handleSelectedItemsMoveSuccess),
    takeEvery(Items.SELECTED_ITEMS_MOVE_FAILURE, handleSelectedItemsMoveFailure),
    takeEvery(Items.GOTO_AFTER_MOVE_ITEM_BOARD, handleGotoAfterMoveItemBoard),
    takeEvery("@@router/LOCATION_CHANGE", unselectAllItems)
  ];
}


export function *handleSelectItems({ meta }) {
  const results = yield select(state => state.items.results);
  yield put(meta(results));
}

export function *watchSelectItems() {
  yield [
    takeEvery(Items.SELECT_ALL_ITEM, handleSelectItems),
    takeEvery(Items.UNSELECT_ALL_ITEM, handleSelectItems),
    takeEvery(Items.SELECT_FAVORITE_ITEM, handleSelectItems),
  ];
}


// Set results
function *setItemResultsByBoardId(boardId) {
  const board = yield select(getBoardEntityById, boardId);
  yield put(Items.setItemResults(board.items));
}

export function *handleSetCurrentBoard() {
  let board = yield select(getCurrentBoard);

  if (!board) {
    yield take(Boards.FETCH_BOARDS_SUCCESS);
    board = yield select(getCurrentBoard);
  }

  if (!board) return;
  yield setItemResultsByBoardId(board.id);
}

export function *watchItemResults() {
  yield [
    takeEvery(Boards.SET_CURRENT_BOARD, handleSetCurrentBoard)
  ];
}


export default function *itemsSaga() {
  yield [
    fork(bgSyncSaga),
    fork(addItemSaga),
    fork(deleteItemSaga),
    fork(favoriteItemSaga),
    fork(moveItemSaga),
    fork(watchSelectItems),
    fork(watchItemResults)
  ];
}
