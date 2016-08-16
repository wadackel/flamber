import { normalize, arrayOf } from "normalizr";
import { takeEvery } from "redux-saga";
import { fork, take, call, put, select } from "redux-saga/effects";
import ItemSchema from "../../schemas/item";
import * as Services from "../../services/items";
import * as Notifications from "../../actions/notifications";
import * as Items from "../../actions/items";
import { getItemEntityById, getSelectedItemEntities } from "../../selectors/items";


export function *handleFavoriteItemToggleRequest({ payload }) {
  const entity = yield select(getItemEntityById, payload);

  try {
    const response = yield call(Services.updateItems, [entity]);
    const normalized = normalize(response, {
      items: arrayOf(ItemSchema)
    });
    yield put(Items.favoriteItemToggleSuccess(
      normalized.entities.items[normalized.result.items[0]]
    ));
  } catch (error) {
    yield put(Items.favoriteItemToggleFailure(error, payload));
  }
}

function *handleFavoriteItemToggleFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("アイテムの更新に失敗しました"));
}

export function *handleSelectedItemsFavoriteRequest() {
  while (true) {
    const { payload } = yield take(Items.SELECTED_ITEMS_FAVORITE_REQUEST);
    const entities = yield select(getSelectedItemEntities);
    const newEntities = entities.map(entity => ({ ...entity, favorite: payload }));

    try {
      const response = yield call(Services.updateItems, newEntities);
      const normalized = normalize(response, {
        items: arrayOf(ItemSchema)
      });
      yield put(Items.selectedItemsFavoriteSuccess(normalized));
    } catch (error) {
      yield put(Items.selectedItemsFavoriteFailure(error, entities));
    }
  }
}

function *handleSelectedItemsFavoriteFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("選択したアイテムの更新に失敗しました"));
}


export default function *favoriteItemSaga() {
  yield [
    takeEvery(Items.FAVORITE_ITEM_TOGGLE_REQUEST, handleFavoriteItemToggleRequest),
    takeEvery(Items.FAVORITE_ITEM_TOGGLE_FAILURE, handleFavoriteItemToggleFailure),
    fork(handleSelectedItemsFavoriteRequest),
    takeEvery(Items.SELECTED_ITEMS_FAVORITE_FAILURE, handleSelectedItemsFavoriteFailure)
  ];
}
