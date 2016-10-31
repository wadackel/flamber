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
  StarItemToggleRequestAction,
  StarItemToggleFailureAction
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
    const { payload } = yield take(I.SELECTED_ITEMS_STAR_REQUEST);
    const entities = yield select(getSelectedItemEntities);
    const newEntities = entities.map(entity => ({ ...entity, star: payload }));

    try {
      const response = yield call(Services.updateItems, newEntities);
      const normalized = normalize(response, {
        items: arrayOf(ItemSchema)
      });
      yield put(I.selectedItemsStarSuccess(normalized));
    } catch (error) {
      yield put(I.selectedItemsStarFailure(error, entities));
    }
  }
}

function *handleSelectedItemsStarFailure(): Generator<any, *, *> {
  // TODO: More error message
  yield put(showNotify("選択したアイテムの更新に失敗しました"));
}


export default function *starItemSaga(): Generator<any, *, *> {
  yield [
    takeEvery(I.STAR_ITEM_TOGGLE_REQUEST, handleStarItemToggleRequest),
    takeEvery(I.STAR_ITEM_TOGGLE_FAILURE, handleStarItemToggleFailure),
    fork(handleSelectedItemsStarRequest),
    takeEvery(I.SELECTED_ITEMS_STAR_FAILURE, handleSelectedItemsStarFailure)
  ];
}
