import { fork } from "redux-saga/effects";
import BoardSchema from "../../schemas/board";
import ItemSchema from "../../schemas/item";
import bgSyncItemSaga from "./bg-sync";
import addItemSaga from "./add";
import favoriteItemSaga from "./favorite";
import moveItemSaga from "./move";
import deleteItemSaga from "./delete";
import selectItemSaga from "./select";
import resultsItemSaga from "./results";

ItemSchema.define({
  board: BoardSchema
});

export default function *itemsSaga() {
  yield [
    fork(bgSyncItemSaga),
    fork(addItemSaga),
    fork(favoriteItemSaga),
    fork(moveItemSaga),
    fork(deleteItemSaga),
    fork(selectItemSaga),
    fork(resultsItemSaga)
  ];
}
