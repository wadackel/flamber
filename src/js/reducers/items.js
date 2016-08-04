/* eslint-disable */
import _ from "lodash";
import { handleActions } from "redux-actions";
import * as Boards from "../actions/boards";
import * as Items from "../actions/items";

const initialState = {
  isFetching: false,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,
  isMoving: false,
  currentItemId: null,
  results: [],
  error: null
};

export default handleActions({
  [Items.ADD_ITEM_REQUEST]: state => ({
    ...state,
    isAdding: true
  }),

  [Items.ADD_ITEM_SUCCESS]: (state, { payload }) => ({
    ...state,
    isAdding: false,
    results: [...state.results, payload.result.item]
  }),

  [Items.ADD_ITEM_FAILURE]: (state, { payload }) => ({
    ...state,
    isAdding: false,
    error: payload
  }),
}, initialState);
