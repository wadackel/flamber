// @flow
import { normalize, arrayOf } from "normalizr";
import { takeEvery } from "redux-saga";
import { fork, take, call, put, select } from "redux-saga/effects";
import ItemSchema from "../../schemas/item";
import * as Services from "../../services/items";
import { showNotify } from "../../actions/notifications";
import * as B from "../../actions/boards";
import * as I from "../../actions/items";
import { getItemEntityById, getSelectedItemEntities } from "../../selectors/items";

import type {
  Items,
  ItemEntity,
  ItemEntities,
  DeleteItemRequestAction,
  DeleteItemSuccessAction,
  DeleteItemFailureAction,
  SelectedItemsDeleteSuccessAction,
  SelectedItemsDeleteFailureAction
} from "../../types/item";


export function *handleDeleteItemRequest(): Generator<any, *, *> {
  while (true) {
    let entity: ?ItemEntity = null;

    try {
      const action: ?DeleteItemRequestAction = yield take(I.DELETE_ITEM_REQUEST);
      if (!action) throw new Error("アイテムの削除に失敗しました");

      entity = yield select(getItemEntityById, action.payload);
      if (!entity) throw new Error("指定したアイテムが存在しません");

      const validEntity: ItemEntity = entity;
      const response = yield call((): Promise<{ items: Items }> => Services.deleteItems([validEntity]));
      if (!response) throw new Error(`${entity.name} の削除に失敗しました`);

      const normalized = normalize({ item: response.items[0] }, { item: ItemSchema });
      yield put(I.deleteItemSuccess(normalized));

    } catch (error) {
      yield put(I.deleteItemFailure(error, entity));
    }
  }
}

function *handleDeleteItemSuccess(action: DeleteItemSuccessAction): Generator<any, *, *> {
  // messages
  const { entities, result } = action.payload;
  const entity = entities.items[result.item];
  yield put(showNotify(`${entity.name} を削除しました`));

  // fetch board
  yield put(B.fetchBoardRequest(entity.board_id));
}

function *handleDeleteItemFailure(action: DeleteItemFailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}


export function *handleSelectedItemsDeleteRequest(): Generator<any, *, *> {
  while (true) {
    yield take(I.SELECTED_ITEMS_DELETE_REQUEST);
    let entities: ?ItemEntities = null;

    try {
      entities = yield select(getSelectedItemEntities);
      if (!entities) throw new Error("アイテムの削除に失敗しました");

      const validEntities: ItemEntities = entities;
      const response = yield call((): Promise<{ items: Items }> => Services.deleteItems(validEntities));
      if (!response) throw new Error("選択したアイテムの削除に失敗しました");

      const normalized = normalize(response, { items: arrayOf(ItemSchema) });
      yield put(I.selectedItemsDeleteSuccess(normalized));

    } catch (error) {
      yield put(I.selectedItemsDeleteFailure(error, entities));
    }
  }
}

function *handleSelectedItemsDeleteSuccess(action: SelectedItemsDeleteSuccessAction): Generator<any, *, *> {
  yield put(showNotify(`${action.payload.result.items.length}個のアイテムを削除しました`));
}

function *handleSelectedItemsDeleteFailure(action: SelectedItemsDeleteFailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}


export default function *deleteItemSaga(): Generator<any, *, *> {
  yield [
    fork(handleDeleteItemRequest),
    takeEvery(I.DELETE_ITEM_SUCCESS, handleDeleteItemSuccess),
    takeEvery(I.DELETE_ITEM_FAILURE, handleDeleteItemFailure),
    fork(handleSelectedItemsDeleteRequest),
    takeEvery(I.SELECTED_ITEMS_DELETE_SUCCESS, handleSelectedItemsDeleteSuccess),
    takeEvery(I.SELECTED_ITEMS_DELETE_FAILURE, handleSelectedItemsDeleteFailure)
  ];
}
