// @flow
import { fork } from "redux-saga/effects";
import profileSaga from "./profile";
import accountSaga from "./account";
import subOptionsSaga from "./options";

export default function *optionsSaga(): Generator<any, void, void> {
  yield [
    fork(profileSaga),
    fork(accountSaga),
    fork(subOptionsSaga)
  ];
}
