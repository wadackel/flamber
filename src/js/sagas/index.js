import { fork } from "redux-saga/effects";
import application from "./application";
import auth from "./auth";
import notifications from "./notifications";
import settings from "./settings";
import boards from "./boards/";
import items from "./items/";
import options from "./options/";
import tags from "./tags/";
import feeds from "./feeds/";

export default function *rootSaga() {
  yield [
    fork(auth),
    fork(boards),
    fork(items),
    fork(notifications),
    fork(settings),
    fork(options),
    fork(tags),
    fork(feeds),
    fork(application)
  ];
}
