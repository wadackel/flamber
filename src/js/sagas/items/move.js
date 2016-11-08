// @flow
import { normalize, arrayOf } from "normalizr";
import { push } from "react-router-redux";
import { takeEvery } from "redux-saga";
import { fork, take, call, put, select } from "redux-saga/effects";
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
  MoveItemFailureAction
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


// export function *handleSelectedItemsMoveRequest(): Generator<any, *, *> {
//   while (true) {
//     const { payload } = yield take(I.SELECTED_ITEMS_MOVE_REQUEST);
//     const entities = yield select(getSelectedItemEntities);
//     const prevBoards = entities.map(entity => entity.board);
//     const newEntities = entities.map(entity => ({ ...entity, board: payload }));
//
//     try {
//       const response = yield call(Services.updateItems, newEntities);
//       const normalized = normalize(response, { items: arrayOf(ItemSchema) });
//       yield put(I.selectedItemsMoveSuccess(
//         normalized,
//         prevBoards
//       ));
//     } catch (error) {
//       yield put(I.selectedItemsMoveFailure(error, entities, prevBoards, payload));
//     }
//   }
// }

// function *handleSelectedItemsMoveSuccess({ payload }): Generator<any, *, *> {
//   const items = payload.result.items.map(id => payload.entities.items[id]);
//   const nextBoard = yield select(getBoardEntityById, items[0].board);
//
//   yield put(showNotify(`${items.length}個のアイテムを${nextBoard.name}へ移動しました`, {
//     type: I.GOTO_AFTER_MOVE_ITEM_BOARD,
//     text: "Show",
//     payload: nextBoard.id
//   }));
// }

// function *handleSelectedItemsMoveFailure(): Generator<any, *, *> {
//   // TODO: More error message
//   yield put(showNotify("選択したアイテムの移動に失敗しました"));
// }
//
// function *handleGotoAfterMoveItemBoard({ payload }): Generator<any, *, *> {
//   yield put(push(`/app/board/${payload}`));
// }
//
// function *unselectAllItems(): Generator<any, *, *> {
//   yield put(I.unselectAllItem());
// }


export default function *moveItemSaga(): Generator<any, *, *> {
  yield [
    takeEvery(I.MOVE_ITEM_REQUEST, handleMoveItemRequest),
    takeEvery(I.MOVE_ITEM_SUCCESS, handleMoveItemSuccess),
    takeEvery(I.MOVE_ITEM_FAILURE, handleMoveItemFailure)

    // fork(handleSelectedItemsMoveRequest),
    // takeEvery(I.SELECTED_ITEMS_MOVE_SUCCESS, handleSelectedItemsMoveSuccess),
    // takeEvery(I.SELECTED_ITEMS_MOVE_FAILURE, handleSelectedItemsMoveFailure),
    // takeEvery(I.GOTO_AFTER_MOVE_ITEM_BOARD, handleGotoAfterMoveItemBoard),
    // takeEvery("@@router/LOCATION_CHANGE", unselectAllItems)
  ];
}
