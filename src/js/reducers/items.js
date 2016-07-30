import { handleActions } from "redux-actions";
import * as Items from "../actions/items";

const initialState = {
  isFetching: false,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,
  isMoving: false,
  currentItemId: null,
  entities: [],
  error: null
};

function mapItemToEntity(item) {
  return {
    select: false,
    isUpdating: false,
    isMoving: false,
    isDeleting: false,
    ...item
  };
}

export default handleActions({
  // Add
  [Items.ADD_ITEM_REQUEST]: state => ({
    ...state,
    isAdding: true,
    error: null
  }),

  [Items.ADD_ITEM_SUCCESS]: state => ({
    ...state,
    isAdding: false
  }),

  [Items.ADD_ITEM_FAILURE]: (state, action) => ({
    ...state,
    isAdding: false,
    error: action.payload
  }),

  // Favorite
  [Items.FAVORITE_ITEM_TOGGLE_REQUEST]: state => ({
    ...state
  }),

  [Items.FAVORITE_ITEM_TOGGLE_SUCCESS]: (state, action) => ({
    ...state,
    entities: state.entities.map(item =>
      item._id !== action.payload._id ? item : {
        ...item,
        favorite: action.payload.favorite
      }
    )
  }),

  [Items.FAVORITE_ITEM_TOGGLE_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload
  }),

  // Move board
  [Items.MOVE_ITEM_BOARD_REQUEST]: (state, action) => ({
    ...state,
    isMoving: true,
    entities: state.entities.map(item =>
      item._id !== action.payload.id ? item : { ...item, isMoving: true }
    )
  }),

  [Items.MOVE_ITEM_BOARD_SUCCESS]: state => ({
    ...state,
    isMoving: false
  }),

  [Items.MOVE_ITEM_BOARD_FAILURE]: (state, action) => ({
    ...state,
    isMoving: false,
    error: action.payload
  }),

  // Delete
  [Items.DELETE_ITEM_REQUEST]: (state, action) => ({
    ...state,
    isDeleting: true,
    entities: state.entities.map(item =>
      item._id !== action.payload ? item : { ...item, isDeleting: true }
    )
  }),

  [Items.DELETE_ITEM_SUCCESS]: state => ({
    ...state,
    isDeleting: false,
    error: null
  }),

  [Items.DELETE_ITEM_FAILURE]: (state, action) => ({
    ...state,
    isDeleting: false,
    error: action.payload
  }),

  // Select
  [Items.SELECT_ITEM_TOGGLE]: (state, action) => ({
    ...state,
    entities: state.entities.map(item =>
      item._id !== action.payload ? item : {
        ...item,
        select: !item.select
      }
    )
  }),

  // Fetch board items
  [Items.FETCH_BOARD_ITEMS_REQUEST]: state => ({
    ...state,
    isFetching: true,
    error: null
  }),

  [Items.FETCH_BOARD_ITEMS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload.map(mapItemToEntity)
  }),

  [Items.FETCH_BOARD_ITEMS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload
  }),

  // Clear items
  [Items.CLEAR_ITEMS]: state => ({ ...state, entities: [] }),

  // Add board items
  [Items.ADD_BOARD_ITEM]: (state, action) => ({
    ...state,
    entities: [...state.entities, mapItemToEntity(action.payload)]
  }),

  // Delete board items
  [Items.REMOVE_BOARD_ITEM]: (state, action) => ({
    ...state,
    entities: state.entities.filter(item =>
      item._id !== action.payload._id
    )
  })
}, initialState);
