import { normalize, arrayOf } from "normalizr";
import { takeEvery } from "redux-saga";
import { fork, take, call, put, select } from "redux-saga/effects";
import ItemSchema from "../../schemas/item";
import * as Services from "../../services/items";
import * as Notifications from "../../actions/notifications";
import * as Items from "../../actions/items";
import { getItemEntityById, getSelectedItemEntities } from "../../selectors/items";


export function *handleStarItemToggleRequest({ payload }) {
  const entity = yield select(getItemEntityById, payload);

  try {
    const response = yield call(Services.updateItems, [entity]);
    const normalized = normalize(response, {
      items: arrayOf(ItemSchema)
    });
    yield put(Items.starItemToggleSuccess(
      normalized.entities.items[normalized.result.items[0]]
    ));
  } catch (error) {
    yield put(Items.starItemToggleFailure(error, payload));
  }
}

function *handleStarItemToggleFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("アイテムの更新に失敗しました"));
}

export function *handleSelectedItemsStarRequest() {
  while (true) {
    const { payload } = yield take(Items.SELECTED_ITEMS_STAR_REQUEST);
    const entities = yield select(getSelectedItemEntities);
    const newEntities = entities.map(entity => ({ ...entity, star: payload }));

    try {
      const response = yield call(Services.updateItems, newEntities);
      const normalized = normalize(response, {
        items: arrayOf(ItemSchema)
      });
      yield put(Items.selectedItemsStarSuccess(normalized));
    } catch (error) {
      yield put(Items.selectedItemsStarFailure(error, entities));
    }
  }
}

function *handleSelectedItemsStarFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("選択したアイテムの更新に失敗しました"));
}


export default function *starItemSaga() {
  yield [
    takeEvery(Items.STAR_ITEM_TOGGLE_REQUEST, handleStarItemToggleRequest),
    takeEvery(Items.STAR_ITEM_TOGGLE_FAILURE, handleStarItemToggleFailure),
    fork(handleSelectedItemsStarRequest),
    takeEvery(Items.SELECTED_ITEMS_STAR_FAILURE, handleSelectedItemsStarFailure)
  ];
}
