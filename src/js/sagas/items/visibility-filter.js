import { takeEvery } from "redux-saga";
import { put } from "redux-saga/effects";
import * as ItemVisibilityFilters from "../../constants/item-visibility-filters";
import * as Boards from "../../actions/boards";
import * as Items from "../../actions/items";


export function *handleSetCurrentBoard() {
  yield put(Items.setItemVisibilityFilter(
    ItemVisibilityFilters.SHOW_ITEM_CURRENT_BOARD
  ));
}


export default function *visibilityFilterSaga() {
  yield [
    takeEvery(Boards.SET_CURRENT_BOARD, handleSetCurrentBoard)
  ];
}
