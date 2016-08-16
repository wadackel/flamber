import { fork } from "redux-saga/effects";
import fetchTagSaga from "./fetch";
import addTagSaga from "./add";
import updateTagSaga from "./update";
import deleteTagSaga from "./delete";

export default function *tagsSaga() {
  yield [
    fork(fetchTagSaga),
    fork(addTagSaga),
    fork(updateTagSaga),
    fork(deleteTagSaga)
  ];
}
