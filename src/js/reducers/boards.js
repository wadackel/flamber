import { handleActions } from "redux-actions";
import * as Boards from "../actions/boards";

const initialState = {
  isFetching: false,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,
  isItemAdding: false,
  isItemDeleting: false,
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
    error: null,
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
      board.id !== action.payload
    )
  }),

  [Boards.DELETE_BOARD_FAILURE]: (state, action) => ({
    ...state,
    isDeleting: false,
    error: action.payload
  }),

  // Detail
  [Boards.DETAIL_BOARD_REQUEST]: state => ({
    ...state,
    isFetching: true,
    error: null
  }),

  [Boards.DETAIL_BOARD_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    currentBoardId: action.payload.id
  }),

  [Boards.DETAIL_BOARD_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload
  }),

  // Add item
  [Boards.ADD_ITEM_REQUEST]: state => ({
    ...state,
    isItemAdding: true,
    error: null
  }),

  [Boards.ADD_ITEM_SUCCESS]: (state, action) => ({
    ...state,
    isItemAdding: false,
    entities: state.entities.map(board =>
      board.id !== action.payload.boardId ? board : {
        ...board,
        itemCount: board.itemCount + 1,
        items: [
          ...board.items,
          action.payload
        ]
      }
    )
  }),

  [Boards.ADD_ITEM_FAILURE]: (state, action) => ({
    ...state,
    isItemAdding: false,
    error: action.payload
  }),

  // Delete item
  [Boards.DELETE_ITEM_REQUEST]: state => ({
    ...state,
    isItemDeleting: true,
    error: null
  }),

  [Boards.DELETE_ITEM_SUCCESS]: (state, action) => ({
    ...state,
    isItemDeleting: false,
    entities: state.entities.map(board =>
      board.id !== action.payload.boardId ? board : {
        ...board,
        itemCount: board.itemCount - 1,
        items: board.items.filter(item =>
          item.id !== action.payload.id
        )
      }
    )
  }),

  [Boards.DELETE_ITEM_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload
  })
}, initialState);
