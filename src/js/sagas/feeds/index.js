import { fork } from "redux-saga/effects";
import addFeedSaga from "./add";

export default function *feedsSaga() {
  yield [
    fork(addFeedSaga)
  ];
}
