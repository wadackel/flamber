import { takeEvery } from "redux-saga";
import { put, select } from "redux-saga/effects";
import { getVisibleItemEntities } from "../../selectors/items";
import * as Items from "../../actions/items";

export function *handleSelectItems({ meta }) {
  const entities = yield select(getVisibleItemEntities);
  yield put(meta(entities));
}

export default function *selectItemSaga() {
  yield [
    takeEvery(Items.SELECT_ALL_ITEM, handleSelectItems),
    takeEvery(Items.UNSELECT_ALL_ITEM, handleSelectItems),
    takeEvery(Items.SELECT_STAR_ITEM, handleSelectItems)
  ];
}
