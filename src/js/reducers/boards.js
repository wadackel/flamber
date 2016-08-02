/* eslint-disable */
import { handleActions } from "redux-actions";
import * as Boards from "../actions/boards";

const initialState = {
  isFetching: false,
  isAdding: false,
  currentBoardId: null,
  entities: [],
  error: null
};

function mapBoardToEntity(board) {
  return {
    isFetching: false,
    isUpdating: false,
    isDeleting: false,
    ...board
  };
}

export default handleActions({
  // Fetch list
  [Boards.FETCH_BOARDS_REQUEST]: state => ({
    ...state,
    isFetching: true
  }),

  [Boards.FETCH_BOARDS_SUCCESS]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    entities: payload.map(mapBoardToEntity)
  }),

  [Boards.FETCH_BOARDS_FAILURE]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    error: payload
  }),
}, initialState);
