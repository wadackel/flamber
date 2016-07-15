import { fork } from "redux-saga/effects";
import auth from "./auth";
import settings from "./settings";

export default function *rootSaga() {
  yield [
    fork(auth),
    fork(settings)
  ];
}
