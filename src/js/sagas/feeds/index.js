import { fork } from "redux-saga/effects";
import fetchFeedSaga from "./fetch";
import addFeedSaga from "./add";

export default function *feedsSaga() {
  yield [
    fork(fetchFeedSaga),
    fork(addFeedSaga)
  ];
}
