// @flow
import { normalize } from "normalizr";
import { put, call, select } from "redux-saga/effects";
import ItemSchema from "../../schemas/item";
import * as Services from "../../services/items";
import { getItemEntityById } from "../../selectors/items";

import type { ItemId, ItemEntity } from "../../types/item";


export function *callUpdateItem(
  payload: { id: ItemId; },
  success: Function,
  failure: Function
): Generator<any, *, *> {
  try {
    const entity: ?ItemEntity = yield select(getItemEntityById, payload.id);
    if (!entity) throw new Error("該当するアイテムが見つかりません");

    const {
      id, // eslint-disable-line no-unused-vars
      ...props
    } = payload;

    const newEntity: ItemEntity = { ...entity, ...props };

    const response = yield call(Services.updateItems, [newEntity]);
    if (!response) throw new Error("アイテムの更新に失敗しました");

    const normalized = normalize({ item: response.items[0] }, { item: ItemSchema });
    yield put(success(normalized));

  } catch (error) {
    yield put(failure(error, payload));
  }
}
