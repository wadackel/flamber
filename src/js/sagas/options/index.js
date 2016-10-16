// @flow
import { fork } from "redux-saga/effects";
import profileSaga from "./profile";
import accountSaga from "./account";

export default function *optionsSaga(): Generator<any, void, void> {
  yield [
    fork(profileSaga),
    fork(accountSaga)
  ];
}
