// @flow
import { normalize } from "normalizr";
import { takeEvery } from "redux-saga";
import { fork, take, put, call, select } from "redux-saga/effects";
import FeedSchema from "../../schemas/feed";
import * as Services from "../../services/feeds";
import { showNotify } from "../../actions/notifications";
import * as F from "../../actions/feeds";
import { getFeedEntityById } from "../../selectors/feeds";

import type {
  Feed,
  FeedEntity,

  DeleteFeedRequestAction,
  DeleteFeedSuccessAction,
  DeleteFeedFailureAction
} from "../../types/feed";


export function *handleDeleteFeedRequest(): Generator<any, *, *> {
  while (true) {
    const action: ?DeleteFeedRequestAction = yield take(F.DELETE_FEED_REQUEST);
    if (!action || !action.payload) throw new Error("フィードの削除に失敗しました");

    const entity: ?FeedEntity = yield select(getFeedEntityById, action.payload);
    if (!entity) throw new Error("該当するフィードが存在しませんでした");

    try {
      const response = yield call((): Promise<{ feed: Feed }> => Services.deleteFeed(entity.id));
      if (!response) throw new Error(`${entity.name}の削除に失敗しました`);

      const normalized = normalize(response, { feed: FeedSchema });
      yield put(F.deleteFeedSuccess(normalized));

    } catch (error) {
      yield put(F.deleteFeedFailure(error, entity));
    }
  }
}

function *handleDeleteFeedSuccess(action: DeleteFeedSuccessAction): Generator<any, *, *> {
  const entity: ?FeedEntity = yield select(getFeedEntityById, action.payload.result.feed);
  yield put(showNotify(`${entity ? entity.name : ""}を削除しました`));
}

function *handleDeleteFeedFailure(action: DeleteFeedFailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}


export default function *deleteFeedSaga(): Generator<any, void, void> {
  yield [
    fork(handleDeleteFeedRequest),
    takeEvery(F.DELETE_FEED_SUCCESS, handleDeleteFeedSuccess),
    takeEvery(F.DELETE_FEED_FAILURE, handleDeleteFeedFailure)
  ];
}
