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

export default handleActions({
  // Add
  [Items.ADD_ITEM_REQUEST]: state => ({
    ...state,
    isAdding: true,
    error: null
  }),

  [Items.ADD_ITEM_SUCCESS]: (state, action) => ({
    ...state,
    isAdding: false
  }),

  [Items.ADD_ITEM_FAILURE]: (state, action) => ({
    ...state,
    isAdding: false,
    error: action.payload
  })
}, initialState);
