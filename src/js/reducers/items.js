import { handleActions } from "redux-actions";
import * as Items from "../actions/items";

const initialState = {
  isFetching: false,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,
  currentItemId: null,
  entities: [],
  error: null
};

function mapItemToEntity(item) {
  return {
    ...item,
    select: false
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

  // Delete
  [Items.DELETE_ITEM_REQUEST]: state => ({
    ...state,
    isDeleting: true,
    error: null
  }),

  [Items.DELETE_ITEM_SUCCESS]: state => ({
    ...state,
    isDeleting: false
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

  // Add board items
  [Items.ADD_BOARD_ITEM]: (state, action) => ({
    ...state,
    entities: [...state.entities, mapItemToEntity(action.payload)]
  }),

  // Delete board items
  [Items.DELETE_BOARD_ITEM]: (state, action) => ({
    ...state,
    entities: state.entities.filter(item =>
      item._id !== action.payload._id
    )
  })
}, initialState);
