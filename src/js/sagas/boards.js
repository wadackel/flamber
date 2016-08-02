/* eslint-disable */
import _ from "lodash";
import deepEqual from "deep-equal";
import { takeEvery } from "redux-saga";
import { fork, take, put, call, select } from "redux-saga/effects";
import { getBoardById } from "../selectors/boards";
import * as Services from "../services/boards";
import * as Boards from "../actions/boards";
import * as Items from "../actions/items";

export function *handleFetchBoardsRequest() {
  while (true) {
    yield take(Boards.FETCH_BOARDS_REQUEST);

    try {
      const entities = yield call(Services.fetchBoards);
      yield put(Boards.fetchBoardsSuccess(entities));
    } catch (error) {
      yield put(Boards.fetchBoardsFailure(error));
    }
  }
}

export default function *boardSaga() {
  yield [
    fork(handleFetchBoardsRequest)
  ];
}

// export function *handleFetchBoardsRequest() {
//   while (true) {
//     yield take(Boards.FETCH_BOARDS_REQUEST);
//
//     try {
//       const boards = yield call(Services.fetchBoards);
//       yield put(Boards.fetchBoardsSuccess(boards));
//     } catch (err) {
//       yield put(Boards.fetchBoardsFailure(err));
//     }
//   }
// }
//
// export function *handleAddBoardRequest() {
//   while (true) {
//     const { payload } = yield take(Boards.ADD_BOARD_REQUEST);
//
//     try {
//       const board = yield call(Services.addBoard, payload);
//       yield put(Boards.addBoardSuccess(board));
//     } catch (err) {
//       yield put(Boards.addBoardFailure(err));
//     }
//   }
// }
//
// export function *handleUpdateBoardRequest({ payload }) {
//   try {
//     const prevBoard = yield select(getBoardById, payload._id);
//
//     if (deepEqual(prevBoard, payload)) {
//       yield put(Boards.updateBoardSuccess(prevBoard));
//
//     } else {
//       const nextBoard = payload;
//       nextBoard.modified = new Date().toString();
//
//       const board = yield call(Services.updateBoard, nextBoard);
//       yield put(Boards.updateBoardSuccess(board));
//     }
//   } catch (err) {
//     yield put(Boards.updateBoardFailure(err));
//   }
// }
//
// export function *watchUpdateBoardRequest() {
//   yield *takeEvery(Boards.UPDATE_BOARD_REQUEST, handleUpdateBoardRequest);
// }
//
// export function *handleDeleteBoardRequest() {
//   while (true) {
//     const { payload } = yield take(Boards.DELETE_BOARD_REQUEST);
//
//     try {
//       yield call(Services.deleteBoard, payload);
//       yield put(Boards.deleteBoardSuccess(payload));
//     } catch (err) {
//       yield put(Boards.deleteBoardFailure(err));
//     }
//   }
// }
//
// export function *handleAddItemSuccess() {
//   while (true) {
//     const { payload } = yield take(Items.ADD_ITEM_SUCCESS);
//     const board = yield select(getBoardById, payload.boardId);
//     const newBoard = { ...board, itemCount: board.itemCount + 1 };
//
//     yield put(Boards.updateBoardRequest(newBoard));
//   }
// }
//
// export function *handleDeleteItemSuccess() {
//   while (true) {
//     const { payload } = yield take(Items.DELETE_ITEM_SUCCESS);
//     const board = yield select(getBoardById, payload.boardId);
//     const newBoard = { ...board, itemCount: board.itemCount - 1 };
//
//     yield put(Boards.updateBoardRequest(newBoard));
//   }
// }
//
// export function *handleMoveItemBoardSuccess() {
//   while (true) {
//     const { payload } = yield take(Items.MOVE_ITEM_BOARD_SUCCESS);
//     const prevBoard = yield select(getBoardById, payload.prevBoardId);
//     const nextBoard = yield select(getBoardById, payload.item.boardId);
//     const newPrevBoard = { ...prevBoard, itemCount: prevBoard.itemCount - 1 };
//     const newNextBoard = { ...nextBoard, itemCount: nextBoard.itemCount + 1 };
//
//     yield put(Boards.updateBoardRequest(newPrevBoard));
//     yield put(Boards.updateBoardRequest(newNextBoard));
//   }
// }
//
// export function *handleSelectedItemsMoveSuccess() {
//   while (true) {
//     const { payload } = yield take(Items.SELECTED_ITEMS_MOVE_SUCCESS);
//     const { items, prevItems } = payload;
//     const prevBoards = yield prevItems.map(o => select(getBoardById, o.boardId));
//     const nextBoards = yield items.map(o => select(getBoardById, o.boardId));
//     const uniqPrevBoards = _.uniq(prevBoards, "_id").map(o => ({ ...o, itemCount: o.itemCount - prevItems.length }));
//     const uniqNextBoards = _.uniq(nextBoards, "_id").map(o => ({ ...o, itemCount: o.itemCount + items.length }));
//
//     yield uniqPrevBoards.map(o => put(Boards.updateBoardRequest(o)));
//     yield uniqNextBoards.map(o => put(Boards.updateBoardRequest(o)));
//   }
// }
//
// export function *handleSelectedItemsDeleteSuccess() {
//   while (true) {
//     const { payload } = yield take(Items.SELECTED_ITEMS_DELETE_SUCCESS);
//     const boards = yield payload.map(o => select(getBoardById, o.boardId));
//     const newBoards = _.uniq(boards, "_id").map(o => ({
//       ...o,
//       itemCount: o.itemCount - payload.filter(i => o._id === i.boardId).length
//     }));
//
//     yield newBoards.map(o => put(Boards.updateBoardRequest(o)));
//   }
// }
//
// export default function *rootSaga() {
//   yield [
//     fork(handleFetchBoardsRequest),
//     fork(handleAddBoardRequest),
//     fork(watchUpdateBoardRequest),
//     fork(handleDeleteBoardRequest),
//     fork(handleAddItemSuccess),
//     fork(handleDeleteItemSuccess),
//     fork(handleMoveItemBoardSuccess),
//     fork(handleSelectedItemsMoveSuccess),
//     fork(handleSelectedItemsDeleteSuccess)
//   ];
// }
