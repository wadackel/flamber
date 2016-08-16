import { normalize, arrayOf } from "normalizr";
import { push } from "react-router-redux";
import { takeEvery } from "redux-saga";
import { fork, take, call, put, select } from "redux-saga/effects";
import ItemSchema from "../../schemas/item";
import * as Services from "../../services/items";
import * as Notifications from "../../actions/notifications";
import * as Items from "../../actions/items";
import { getBoardEntityById, getCurrentBoard } from "../../selectors/boards";
import { getMoveItemEntities, getSelectedItemEntities } from "../../selectors/items";


export function *handleMoveItemRequest() {
  while (true) {
    const { payload } = yield take(Items.MOVE_ITEM_REQUEST);
    const [entity] = yield select(getMoveItemEntities);
    const prevBoard = entity.board;
    const newEntity = { ...entity, board: payload };

    try {
      const response = yield call(Services.updateItems, [newEntity]);
      const normalized = normalize(response, { items: arrayOf(ItemSchema) });
      yield put(Items.moveItemSuccess(
        normalized,
        prevBoard
      ));
    } catch (error) {
      yield put(Items.moveItemFailure(error, entity, prevBoard, payload));
    }
  }
}

function *handleMoveItemSuccess({ payload, meta }) {
  const item = payload.entities.items[payload.result.items[0]];
  const nextBoard = yield select(getBoardEntityById, item.board);
  const currentBoard = yield select(getCurrentBoard);

  if (currentBoard && currentBoard.id === meta.prevBoard) {
    const results = currentBoard.items.filter(id => id !== item.id);
    yield put(Items.setItemResults(results));
  }

  yield put(Notifications.showNotify(`${nextBoard.name}に移動しました`, {
    type: Items.GOTO_AFTER_MOVE_ITEM_BOARD,
    text: "Show",
    payload: nextBoard.id
  }));
}

function *handleMoveItemFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("アイテムの移動に失敗しました"));
}

export function *handleSelectedItemsMoveRequest() {
  while (true) {
    const { payload } = yield take(Items.SELECTED_ITEMS_MOVE_REQUEST);
    const entities = yield select(getSelectedItemEntities);
    const prevBoards = entities.map(entity => entity.board);
    const newEntities = entities.map(entity => ({ ...entity, board: payload }));

    try {
      const response = yield call(Services.updateItems, newEntities);
      const normalized = normalize(response, { items: arrayOf(ItemSchema) });
      yield put(Items.selectedItemsMoveSuccess(
        normalized,
        prevBoards
      ));
    } catch (error) {
      yield put(Items.selectedItemsMoveFailure(error, entities, prevBoards, payload));
    }
  }
}

function *handleSelectedItemsMoveSuccess({ payload, meta }) {
  const items = payload.result.items.map(id => payload.entities.items[id]);
  const nextBoard = yield select(getBoardEntityById, items[0].board);
  const currentBoard = yield select(getCurrentBoard);

  if (currentBoard && meta.prevBoards.indexOf(currentBoard.id) > -1) {
    const results = currentBoard.items.filter(id => payload.result.items.indexOf(id) < 0);
    yield put(Items.setItemResults(results));
  }

  yield put(Notifications.showNotify(`${items.length}個のアイテムを${nextBoard.name}へ移動しました`, {
    type: Items.GOTO_AFTER_MOVE_ITEM_BOARD,
    text: "Show",
    payload: nextBoard.id
  }));
}

function *handleSelectedItemsMoveFailure() {
  // TODO: More error message
  yield put(Notifications.showNotify("選択したアイテムの移動に失敗しました"));
}

function *handleGotoAfterMoveItemBoard({ payload }) {
  yield put(push(`/app/board/${payload}`));
}

function *unselectAllItems() {
  yield put(Items.unselectAllItem());
}


export default function *moveItemSaga() {
  yield [
    fork(handleMoveItemRequest),
    takeEvery(Items.MOVE_ITEM_SUCCESS, handleMoveItemSuccess),
    takeEvery(Items.MOVE_ITEM_FAILURE, handleMoveItemFailure),
    fork(handleSelectedItemsMoveRequest),
    takeEvery(Items.SELECTED_ITEMS_MOVE_SUCCESS, handleSelectedItemsMoveSuccess),
    takeEvery(Items.SELECTED_ITEMS_MOVE_FAILURE, handleSelectedItemsMoveFailure),
    takeEvery(Items.GOTO_AFTER_MOVE_ITEM_BOARD, handleGotoAfterMoveItemBoard),
    takeEvery("@@router/LOCATION_CHANGE", unselectAllItems)
  ];
}
