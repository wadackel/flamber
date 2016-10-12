// @flow
import { fork } from "redux-saga/effects";
import profileSaga from "./profile";

export default function *optionsSaga(): Generator<any, void, void> {
  yield [
    fork(profileSaga)
  ];
}
