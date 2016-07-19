import { fork } from "redux-saga/effects";
import auth from "./auth";
import settings from "./settings";
import boards from "./boards";

export default function *rootSaga() {
  yield [
    fork(auth),
    fork(settings),
    fork(boards)
  ];
}
