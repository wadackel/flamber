import { fork } from "redux-saga/effects";
import application from "./application";
import auth from "./auth";
import settings from "./settings";
import boards from "./boards";
import items from "./items";

export default function *rootSaga() {
  yield [
    fork(application),
    fork(auth),
    fork(settings),
    fork(boards),
    fork(items)
  ];
}
