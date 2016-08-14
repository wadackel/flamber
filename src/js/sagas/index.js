import { fork } from "redux-saga/effects";
import application from "./application";
import auth from "./auth";
import boards from "./boards";
import items from "./items";
import notifications from "./notifications";
import settings from "./settings";

export default function *rootSaga() {
  yield [
    fork(application),
    fork(auth),
    fork(boards),
    fork(items),
    fork(notifications),
    fork(settings)
  ];
}
