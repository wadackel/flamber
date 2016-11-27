// @flow
import deepEqual from "deep-equal";
import { normalize, arrayOf } from "normalizr";
import { takeEvery } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import BoardSchema from "../../schemas/board";
import * as Services from "../../services/boards";
import { showNotify } from "../../actions/notifications";
import * as B from "../../actions/boards";
import { getBoardEntityById } from "../../selectors/boards";

import type {
  Boards,
  UpdateBoardIfNeededAction,
  UpdateBoardRequestAction,
  UpdateBoardFailureAction,
  SelectCoverItemRequestAction,
  SelectCoverItemSuccessAction,
  SelectCoverItemFailureAction
} from "../../types/board";

type FailureAction = UpdateBoardFailureAction | SelectCoverItemFailureAction;


export function *handleUpdateBoardIfNeeded(action: UpdateBoardIfNeededAction): Generator<any, *, *> {
  const entity = yield select(getBoardEntityById, action.payload.id);

  if (!deepEqual(entity, action.payload)) {
    yield put(B.updateBoardRequest(action.payload));
  }
}

export function *handleUpdateBoardRequest(action: UpdateBoardRequestAction): Generator<any, *, *> {
  try {
    const response = yield call((): Promise<{ boards: Boards }> => Services.updateBoards([action.payload]));
    if (!response) throw new Error("ボードの更新に失敗しました");

    const normalized = normalize(response, { boards: arrayOf(BoardSchema) });
    yield put(B.updateBoardSuccess(normalized));

  } catch (error) {
    yield put(B.updateBoardFailure(error, action.payload));
  }
}

function *handleUpdateBoardSuccess(): Generator<any, *, *> {
  yield put(showNotify("ボードを更新しました"));
}


export function *handleSelectCoverItemRequest(action: SelectCoverItemRequestAction): Generator<any, *, *> {
  try {
    const entity = yield select(getBoardEntityById, action.payload.id);
    if (!entity) throw new Error("該当するボードが見つかりません");

    const newEntity = { ...entity, Cover: action.payload.item };
    const response = yield call((): Promise<{ boards: Boards }> => Services.updateBoards([newEntity]));
    if (!response) throw new Error("カバー画像の変更に失敗しました");

    const normalized = normalize({ board: response.boards[0] }, { board: BoardSchema });
    yield put(B.selectCoverItemSuccess(normalized));

  } catch (error) {
    yield put(B.selectCoverItemFailure(error, action.payload.id));
  }
}

function *handleSelectCoverItemSuccess(action: SelectCoverItemSuccessAction): Generator<any, *, *> {
  const { entities, result } = action.payload;
  const entity = entities.boards[result.board];

  yield put(B.selectCoverItemDialogClose());
  yield put(showNotify(`${entity.name} のカバー画像を変更しました`));
}


function *handleUpdateBoardFailure(action: FailureAction): Generator<any, *, *> {
  yield put(showNotify(action.payload.message));
}


export default function *updateBoardSaga(): Generator<any, *, *> {
  yield [
    takeEvery(B.UPDATE_BOARD_IF_NEEDED, handleUpdateBoardIfNeeded),
    takeEvery(B.UPDATE_BOARD_REQUEST, handleUpdateBoardRequest),
    takeEvery(B.UPDATE_BOARD_SUCCESS, handleUpdateBoardSuccess),

    takeEvery(B.SELECT_COVER_ITEM_REQUEST, handleSelectCoverItemRequest),
    takeEvery(B.SELECT_COVER_ITEM_SUCCESS, handleSelectCoverItemSuccess),

    takeEvery([
      B.UPDATE_BOARD_FAILURE,
      B.SELECT_COVER_ITEM_FAILURE
    ], handleUpdateBoardFailure)
  ];
}
