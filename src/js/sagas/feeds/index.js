import { fork } from "redux-saga/effects";
import fetchFeedSaga from "./fetch";
import addFeedSaga from "./add";
import deleteFeedSaga from "./delete";

export default function *feedsSaga() {
  yield [
    fork(fetchFeedSaga),
    fork(addFeedSaga),
    fork(deleteFeedSaga)
  ];
}
