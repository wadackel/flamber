// @flow
import { takeEvery } from "redux-saga";
import { put } from "redux-saga/effects";
import * as ItemVisibilityFilters from "../../constants/item-visibility-filters";
import * as B from "../../actions/boards";
import * as I from "../../actions/items";


export function *handleSetCurrentBoard(): Generator<any, *, *> {
  yield put(I.setItemVisibilityFilter(
    ItemVisibilityFilters.CURRENT_BOARD
  ));
}


export default function *visibilityFilterSaga(): Generator<any, *, *> {
  yield [
    takeEvery(B.SET_CURRENT_BOARD, handleSetCurrentBoard)
  ];
}
