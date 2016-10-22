// @flow
import { normalize } from "normalizr";
import { takeEvery } from "redux-saga";
import { fork, take, put, call, select } from "redux-saga/effects";
import FeedSchema from "../../schemas/feed";
import * as Services from "../../services/feeds";
import { showNotify } from "../../actions/notifications";
import * as F from "../../actions/feeds";
import { getFeedEntityByURL } from "../../selectors/feeds";

import type {
  Feed,
  FeedEntity,

  AddFeedRequestAction,
  AddFeedFailureAction
} from "../../types/feed";


export function *handleAddFeedRequest(): Generator<any, *, *> {
  while (true) {
    try {
      const action: ?AddFeedRequestAction = yield take(F.ADD_FEED_REQUEST);
      if (!action) throw new Error("フィードの追加に失敗しました");

      const entity: ?FeedEntity = yield select(getFeedEntityByURL, action.payload);
      if (entity) throw new Error(`${action.payload}は既に登録されています`);

      const response = yield call((): Promise<{ feed: Feed }> => Services.addFeed(action.payload));
      if (!response) throw new Error("フィードの追加に失敗しました");

      const normalized = normalize(response, { feed: FeedSchema });
      yield put(F.addFeedSuccess(normalized));

    } catch (error) {
      yield put(F.addFeedFailure(error));
    }
  }
}

function *handleAddFeedSuccess(): Generator<any, *, *> {
  yield put(showNotify("フィードを追加しました"));
}

function *handleAddFeedFailure(action: AddFeedFailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}


export default function *addFeedSaga(): Generator<any, void, void> {
  yield [
    fork(handleAddFeedRequest),
    takeEvery(F.ADD_FEED_SUCCESS, handleAddFeedSuccess),
    takeEvery(F.ADD_FEED_FAILURE, handleAddFeedFailure)
  ];
}
