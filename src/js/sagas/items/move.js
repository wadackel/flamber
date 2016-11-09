// @flow
import { normalize, arrayOf } from "normalizr";
import { push } from "react-router-redux";
import { takeEvery } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import ItemSchema from "../../schemas/item";
import * as Services from "../../services/items";
import { showNotify } from "../../actions/notifications";
import * as I from "../../actions/items";
import * as B from "../../actions/boards";
import { getBoardEntityById } from "../../selectors/boards";
import { getMoveItemEntities, getSelectedItemEntities } from "../../selectors/items";

import type {
  Items,
  ItemEntity,
  ItemEntities,
  MoveItemRequestAction,
  MoveItemSuccessAction,
  MoveItemFailureAction,
  SelectedItemsMoveRequestAction,
  SelectedItemsMoveSuccessAction,
  SelectedItemsMoveFailureAction
} from "../../types/item";
import type { BoardId, BoardEntity } from "../../types/board";


export function *handleMoveItemRequest(action: MoveItemRequestAction): Generator<any, *, *> {
  let entity: ?ItemEntity = null;
  let prevBoard: ?BoardId = null;

  try {
    const entities: ?ItemEntities = yield select(getMoveItemEntities);
    if (!entities || entities.length === 0) throw new Error("移動するアイテムが存在しません");

    entity = entities[0];
    const validEntity: ItemEntity = entity;
    prevBoard = validEntity.board_id;
    const prev = validEntity.board_id;
    const newEntity: ItemEntity = { ...validEntity, board_id: action.payload };

    const response = yield call((): Promise<{ items: Items }> => Services.updateItems([newEntity]));
    if (!response) throw new Error(`${validEntity.name} の移動に失敗しました`);

    const normalized = normalize({ item: response.items[0] }, { item: ItemSchema });
    yield put(I.moveItemSuccess(normalized, prev));

  } catch (error) {
    yield put(I.moveItemFailure(error, entity, prevBoard, action.payload));
  }
}

function *handleMoveItemSuccess(action: MoveItemSuccessAction): Generator<any, *, *> {
  const entity: ItemEntity = action.payload.entities.items[action.payload.result.item];
  const nextBoard: ?BoardEntity = yield select(getBoardEntityById, entity.board_id);

  if (!nextBoard) return;

  // notify
  yield put(showNotify(`${nextBoard.name}に移動しました`, {
    type: I.GOTO_AFTER_MOVE_ITEM_BOARD,
    payload: {
      text: "Show",
      value: nextBoard.id
    }
  }));

  // fetch board
  yield put(B.fetchBoardRequest(entity.board_id));
}

function *handleMoveItemFailure(action: MoveItemFailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}


export function *handleSelectedItemsMoveRequest(action: SelectedItemsMoveRequestAction): Generator<any, *, *> {
  let entities: ?ItemEntities = null;
  let prevBoards: Array<BoardId> = [];

  try {
    entities = yield select(getSelectedItemEntities);
    if (!entities || entities.length === 0) throw new Error("アイテムが選択されていません");

    prevBoards = entities.map(entity => entity.board_id);

    const newEntities = entities.map(entity => ({ ...entity, board_id: action.payload }));
    const response = yield call(Services.updateItems, newEntities);
    if (!response) throw new Error("選択したアイテムの移動に失敗しました");

    const normalized = normalize(response, { items: arrayOf(ItemSchema) });
    yield put(I.selectedItemsMoveSuccess(normalized, prevBoards));

  } catch (error) {
    yield put(I.selectedItemsMoveFailure(error, entities, prevBoards, action.payload));
  }
}

function *handleSelectedItemsMoveSuccess(action: SelectedItemsMoveSuccessAction): Generator<any, *, *> {
  const entities: ItemEntities = action.payload.result.items.map(id => action.payload.entities.items[id]);
  const nextBoard = yield select(getBoardEntityById, entities[0].board_id);

  if (!nextBoard) return;

  // notify
  yield put(showNotify(`${entities.length}個のアイテムを${nextBoard.name}へ移動しました`, {
    type: I.GOTO_AFTER_MOVE_ITEM_BOARD,
    payload: {
      text: "Show",
      value: nextBoard.id
    }
  }));

  // fetch board
  const boardIds: Array<BoardId> = [...action.meta, nextBoard.id];
  yield boardIds.map((boardId: BoardId) => put(B.fetchBoardRequest(boardId)));
}

function *handleSelectedItemsMoveFailure(action: SelectedItemsMoveFailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}

// function *handleGotoAfterMoveItemBoard({ payload }): Generator<any, *, *> {
//   yield put(push(`/app/board/${payload}`));
// }

function *unselectAllItems(): Generator<any, *, *> {
  yield put(I.unselectAllItem());
}


export default function *moveItemSaga(): Generator<any, *, *> {
  yield [
    takeEvery(I.MOVE_ITEM_REQUEST, handleMoveItemRequest),
    takeEvery(I.MOVE_ITEM_SUCCESS, handleMoveItemSuccess),
    takeEvery(I.MOVE_ITEM_FAILURE, handleMoveItemFailure),

    takeEvery(I.SELECTED_ITEMS_MOVE_REQUEST, handleSelectedItemsMoveRequest),
    takeEvery(I.SELECTED_ITEMS_MOVE_SUCCESS, handleSelectedItemsMoveSuccess),
    takeEvery(I.SELECTED_ITEMS_MOVE_FAILURE, handleSelectedItemsMoveFailure),
    // takeEvery(I.GOTO_AFTER_MOVE_ITEM_BOARD, handleGotoAfterMoveItemBoard),

    takeEvery("@@router/LOCATION_CHANGE", unselectAllItems)
  ];
}
