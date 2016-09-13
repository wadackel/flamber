import { normalize, arrayOf } from "normalizr";
import { delay } from "redux-saga";
import { fork, take, call, put, select, cancel, cancelled } from "redux-saga/effects";
import ItemSchema from "../../schemas/item";
import * as Services from "../../services/items";
import * as Auth from "../../actions/auth";
import * as Items from "../../actions/items";


// const ITEM_SYNC_INTERVAL = 60000;
const ITEM_SYNC_INTERVAL = 10000;


export function *bgSync() {
  try {
    while (true) {
      yield put(Items.bgSyncItemsRequest());
      const response = yield call(Services.fetchItems);
      const normalized = normalize(response, {
        items: arrayOf(ItemSchema)
      });

      yield put(Items.bgSyncItemsSuccess(normalized));
      yield call(delay, ITEM_SYNC_INTERVAL);
    }
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      yield put(Items.bgSyncItemsFailure());
    }
  }
}

export function *watchBgSync() {
  while (yield take(Items.BG_SYNC_ITEMS_START)) {
    const bgSyncTask = yield fork(bgSync);
    yield take(Items.BG_SYNC_ITEMS_STOP);
    yield cancel(bgSyncTask);
  }
}


export default function *bgSyncItemSaga() {
  // yield fork(watchBgSync);

  // const { authenticated } = yield select(state => state.auth);
  //
  // if (authenticated) {
  //   yield call(delay, 5000);
  //   // yield put(Items.bgSyncItemsStart());
  //
  // } else {
  //   yield take(Auth.SIGN_IN_SUCCESS);
  //   // yield put(Items.bgSyncItemsStart());
  // }
}
