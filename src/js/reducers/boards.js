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
  // Add & Remove
  [Boards.ADD_BOARD]: (state, { payload }) => ({
    ...state,
    entities: [...state.entities, mapBoardToEntity(payload)]
  }),

  [Boards.REMOVE_BOARD]: (state, { payload }) => ({
    ...state,
    entities: state.entities.filter(entity =>
      entity.id !== payload.id
    )
  }),


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


  // Add
  [Boards.ADD_BOARD_REQUEST]: state => ({
    ...state,
    isAdding: true
  }),

  [Boards.ADD_BOARD_SUCCESS]: state => ({
    ...state,
    isAdding: false
  }),

  [Boards.ADD_BOARD_FAILURE]: (state, { payload }) => ({
    ...state,
    isAdding: false,
    error: payload
  }),


  // Delete
  [Boards.DELETE_BOARD_REQUEST]: (state, { payload }) => ({
    ...state,
    isDeleting: true,
    entities: state.entities.map(entity =>
      entity.id !== payload ? entity : {
        ...entity,
        isDeleting: true
      }
    )
  }),

  [Boards.DELETE_BOARD_SUCCESS]: state => ({
    ...state,
    isDeleting: false
  }),

  [Boards.DELETE_BOARD_FAILURE]: (state, { payload }) => ({
    ...state,
    isDeleting: false,
    error: payload
  }),
}, initialState);
