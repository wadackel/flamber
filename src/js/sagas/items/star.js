// @flow
import { normalize, arrayOf } from "normalizr";
import { takeEvery } from "redux-saga";
import { fork, take, call, put, select } from "redux-saga/effects";
import ItemSchema from "../../schemas/item";
import * as Services from "../../services/items";
import { showNotify } from "../../actions/notifications";
import * as I from "../../actions/items";
import { getItemEntityById, getSelectedItemEntities } from "../../selectors/items";

import type {
  ItemEntity,
  Items,
  ItemEntities,
  StarItemToggleRequestAction,
  StarItemToggleFailureAction,
  SelectedItemsStarRequestAction,
  SelectedItemsStarFailureAction
} from "../../types/item";


export function *handleStarItemToggleRequest(action: StarItemToggleRequestAction): Generator<any, *, *> {
  try {
    const entity: ?ItemEntity = yield select(getItemEntityById, action.payload);
    if (!entity) throw new Error("該当するアイテムが存在しません");

    const response = yield call((): Promise<{ items: Items }> => Services.updateItems([entity]));
    if (!response) throw new Error("アイテムの更新に失敗しました");

    const normalized = normalize({ item: response.items[0] }, { item: ItemSchema });
    yield put(I.starItemToggleSuccess(normalized));

  } catch (error) {
    yield put(I.starItemToggleFailure(error, action.payload));
  }
}

function *handleStarItemToggleFailure(action: StarItemToggleFailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}

export function *handleSelectedItemsStarRequest(): Generator<any, *, *> {
  while (true) {
    let entities: ?ItemEntities = null;

    try {
      const action: ?SelectedItemsStarRequestAction = yield take(I.SELECTED_ITEMS_STAR_REQUEST);
      if (!action) throw new Error("アイテムの更新に失敗しました");

      entities = yield select(getSelectedItemEntities);
      if (!entities) throw new Error("アイテムが選択されていません");

      const newEntities: ItemEntities = entities.map((entity: ItemEntity): ItemEntity => ({
        ...entity,
        star: action.payload
      }));

      const response = yield call((): Promise<{ items: Items }> => Services.updateItems(newEntities));
      if (!response) throw new Error("選択したアイテムの更新に失敗しました");

      const normalized = normalize(response, { items: arrayOf(ItemSchema) });
      yield put(I.selectedItemsStarSuccess(normalized));

    } catch (error) {
      yield put(I.selectedItemsStarFailure(error, entities));
    }
  }
}

function *handleSelectedItemsStarFailure(action: SelectedItemsStarFailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}


export default function *starItemSaga(): Generator<any, *, *> {
  yield [
    takeEvery(I.STAR_ITEM_TOGGLE_REQUEST, handleStarItemToggleRequest),
    takeEvery(I.STAR_ITEM_TOGGLE_FAILURE, handleStarItemToggleFailure),
    fork(handleSelectedItemsStarRequest),
    takeEvery(I.SELECTED_ITEMS_STAR_FAILURE, handleSelectedItemsStarFailure)
  ];
}
