// @flow
import { takeEvery } from "redux-saga";
import { put, select } from "redux-saga/effects";
import { getVisibleItemEntities } from "../../selectors/items";
import * as I from "../../actions/items";

import type {
  SelectAllItemAction,
  UnselectAllItemAction,
  SelectStarItemAction
} from "../../types/item";

type SelectItemAction =
  SelectAllItemAction |
  UnselectAllItemAction |
  SelectStarItemAction;

export function *handleSelectItems(action: SelectItemAction): Generator<any, *, *> {
  const entities = yield select(getVisibleItemEntities);
  if (action.meta) {
    yield put(action.meta(entities));
  }
}

export default function *selectItemSaga(): Generator<any, *, *> {
  yield [
    takeEvery([
      I.SELECT_ALL_ITEM,
      I.UNSELECT_ALL_ITEM,
      I.SELECT_STAR_ITEM
    ], handleSelectItems)
  ];
}
