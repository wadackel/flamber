// @flow
import { normalize } from "normalizr";
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
  DeleteItemRequestAction,
  DeleteItemSuccessAction,
  DeleteItemFailureAction
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
  yield put(B.fetchBoard(entity.board_id));
}

function *handleDeleteItemFailure(action: DeleteItemFailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}

export function *handleSelectedItemsDeleteRequest(): Generator<any, *, *> {
  while (true) {
    yield take(I.SELECTED_ITEMS_DELETE_REQUEST);
    const entities = yield select(getSelectedItemEntities);

    try {
      yield call(Services.deleteItems, entities);
      yield put(I.selectedItemsDeleteSuccess(entities));
    } catch (error) {
      yield put(I.selectedItemsDeleteFailure(error, entities));
    }
  }
}

function *handleSelectedItemsDeleteSuccess({ payload }): Generator<any, *, *> {
  yield put(showNotify(`${payload.length}個のアイテムを削除しました`));
}

function *handleSelectedItemsDeleteFailure(): Generator<any, *, *> {
  // TODO: More error message
  yield put(showNotify("選択アイテムの削除に失敗しました"));
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
