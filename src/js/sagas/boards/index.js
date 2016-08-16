import { arrayOf } from "normalizr";
import { fork } from "redux-saga/effects";
import BoardSchema from "../../schemas/board";
import ItemSchema from "../../schemas/item";
import fetchBoardSaga from "./fetch";
import addBoardSaga from "./add";
import updateBoardSaga from "./update";
import deleteBoardSaga from "./delete";

BoardSchema.define({
  items: arrayOf(ItemSchema)
});

export default function *boardsSaga() {
  yield [
    fork(fetchBoardSaga),
    fork(addBoardSaga),
    fork(updateBoardSaga),
    fork(deleteBoardSaga)
  ];
}
