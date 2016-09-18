import { fork } from "redux-saga/effects";
import auth from "./auth";
import boards from "./boards";
import items from "./items";
import notifications from "./notifications";
import settings from "./settings";
import tags from "./tags";
import application from "./application";

export default function *rootSaga() {
  yield [
    fork(auth),
    fork(boards),
    fork(items),
    fork(notifications),
    fork(settings),
    fork(tags),
    fork(application)
  ];
}
