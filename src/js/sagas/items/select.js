import { takeEvery } from "redux-saga";
import { put, select } from "redux-saga/effects";
import * as Items from "../../actions/items";

export function *handleSelectItems({ meta }) {
  const results = yield select(state => state.items.results);
  yield put(meta(results));
}

export default function *selectItemSaga() {
  yield [
    takeEvery(Items.SELECT_ALL_ITEM, handleSelectItems),
    takeEvery(Items.UNSELECT_ALL_ITEM, handleSelectItems),
    takeEvery(Items.SELECT_STAR_ITEM, handleSelectItems)
  ];
}
