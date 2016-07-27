import { handleActions } from "redux-actions";
import * as Boards from "../actions/boards";

const initialState = {
  isFetching: false,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,
  currentBoardId: null,
  entities: [],
  error: null
};

export default handleActions({
  // Fetch
  [Boards.FETCH_BOARDS_REQUEST]: state => ({
    ...state,
    isFetching: true,
    error: null
  }),

  [Boards.FETCH_BOARDS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload
  }),

  [Boards.FETCH_BOARDS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload
  }),

  // Add
  [Boards.ADD_BOARD_REQUEST]: state => ({
    ...state,
    isAdding: true,
    error: null
  }),

  [Boards.ADD_BOARD_SUCCESS]: (state, action) => ({
    ...state,
    isAdding: false,
    entities: [...state.entities, action.payload]
  }),

  [Boards.ADD_BOARD_FAILURE]: (state, action) => ({
    ...state,
    isAdding: false,
    error: action.payload
  }),

  // Update
  [Boards.UPDATE_BOARD_REQUEST]: state => ({
    ...state,
    isUpdating: true,
    error: null
  }),

  [Boards.UPDATE_BOARD_SUCCESS]: (state, action) => ({
    ...state,
    isUpdating: false,
    entities: state.entities.map(board =>
      board.id === action.payload.id ? action.payload : board
    )
  }),

  [Boards.UPDATE_BOARD_FAILURE]: (state, action) => ({
    ...state,
    isUpdating: false,
    error: action.payload
  }),

  // Delete
  [Boards.DELETE_BOARD_REQUEST]: state => ({
    ...state,
    isDeleting: true,
    error: null
  }),

  [Boards.DELETE_BOARD_SUCCESS]: (state, action) => ({
    ...state,
    isDeleting: false,
    entities: state.entities.filter(board =>
      board._id !== action.payload
    )
  }),

  [Boards.DELETE_BOARD_FAILURE]: (state, action) => ({
    ...state,
    isDeleting: false,
    error: action.payload
  }),

  // Current board
  [Boards.CURRENT_BOARD]: (state, action) => ({
    ...state,
    currentBoardId: action.payload
  })
}, initialState);
