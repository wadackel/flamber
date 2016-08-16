import { normalize, arrayOf } from "normalizr";
import { takeEvery } from "redux-saga";
import { call, put } from "redux-saga/effects";
import BoardSchema from "../../schemas/board";
import * as Services from "../../services/boards";
import * as Boards from "../../actions/boards";


export function *handleFetchBoardsRequest() {
  try {
    const response = yield call(Services.fetchBoards);
    const normalized = normalize(response, {
      boards: arrayOf(BoardSchema)
    });
    yield put(Boards.fetchBoardsSuccess(normalized));
  } catch (error) {
    yield put(Boards.fetchBoardsFailure(error));
  }
}

export default function *fetchBoardSaga() {
  yield [
    takeEvery(Boards.FETCH_BOARDS_REQUEST, handleFetchBoardsRequest)
  ];
}
