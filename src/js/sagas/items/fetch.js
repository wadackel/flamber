import { normalize, arrayOf } from "normalizr";
import { takeEvery, takeLatest } from "redux-saga";
import { call, put } from "redux-saga/effects";
import ItemSchema from "../../schemas/item";
import * as Services from "../../services/items";
import * as Notifications from "../../actions/notifications";
import * as Items from "../../actions/items";


export function *handleFetchItemsRequest({ payload = {} }) {
  try {
    const response = yield call(Services.fetchItems, payload);
    const normalized = normalize(response, {
      items: arrayOf(ItemSchema)
    });
    yield put(Items.fetchItemsSuccess(normalized));
  } catch (error) {
    yield put(Items.fetchItemsFailure(error));
  }
}

function *handleFetchItemsFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("アイテムの取得に失敗しました"));
}


export default function *fetchItemSaga() {
  yield [
    takeLatest(Items.FETCH_ITEMS_REQUEST, handleFetchItemsRequest),
    takeEvery(Items.FETCH_ITEMS_FAILURE, handleFetchItemsFailure)
  ];
}
