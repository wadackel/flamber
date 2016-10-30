import { arrayOf } from "normalizr";
import { fork } from "redux-saga/effects";
import BoardSchema from "../../schemas/board";
import ItemSchema from "../../schemas/item";
import TagSchema from "../../schemas/tag";
import bgSyncItemSaga from "./bg-sync";
import addItemSaga from "./add";
import starItemSaga from "./star";
import updateItemSaga from "./update";
import tagItemSaga from "./tag";
import fetchItemSaga from "./fetch";
import moveItemSaga from "./move";
import deleteItemSaga from "./delete";
import selectItemSaga from "./select";
import visibilityFilterSaga from "./visibility-filter";

ItemSchema.define({
  board: BoardSchema,
  Tags: arrayOf(TagSchema)
});

export default function *itemsSaga() {
  yield [
    fork(bgSyncItemSaga),
    fork(addItemSaga),
    fork(starItemSaga),
    fork(updateItemSaga),
    fork(tagItemSaga),
    fork(fetchItemSaga),
    fork(moveItemSaga),
    fork(deleteItemSaga),
    fork(selectItemSaga),
    fork(visibilityFilterSaga)
  ];
}
