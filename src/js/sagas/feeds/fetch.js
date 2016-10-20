// @flow
import { normalize, arrayOf } from "normalizr";
import { takeLatest, takeEvery } from "redux-saga";
import { put, call } from "redux-saga/effects";
import FeedSchema from "../../schemas/feed";
import * as Services from "../../services/feeds";
import { showNotify } from "../../actions/notifications";
import * as F from "../../actions/feeds";

import type { Feed } from "../../types/feed";


export function *handleFetchFeedsRequest(): Generator<any, *, *> {
  try {
    const response = yield call((): Promise<Array<Feed>> => Services.fetchFeeds());
    if (!response) throw new Error("TODO");

    const normalized = normalize(response, {
      feeds: arrayOf(FeedSchema)
    });
    yield put(F.fetchFeedsSuccess(normalized));

  } catch (error) {
    yield put(F.fetchFeedsFailure(error));
  }
}

// TODO: More error messages
function *handleFetchFeedsFailure(): Generator<any, *, *> {
  yield put(showNotify("フィードの取得に失敗しました"));
}


export default function *fetchFeedSaga(): Generator<any, void, void> {
  yield [
    takeLatest(F.FETCH_FEEDS_REQUEST, handleFetchFeedsRequest),
    takeEvery(F.FETCH_FEEDS_FAILURE, handleFetchFeedsFailure)
  ];
}
