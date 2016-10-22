// @flow
import { handleActions } from "redux-actions";
import * as T from "../actions/tags";

import type {
  TagState,

  AddTagSuccessAction,
  AddTagFailureAction
} from "../types/tag";

const initialState: TagState = {
  isFetching: false,
  isAdding: false,
  results: [],
  currentTag: null,
  error: null,
  drawerOpen: false
};

export default handleActions({
  // Set current tag
  [T.SET_CURRENT_TAG]: (state, { payload }) => ({
    ...state,
    currentTag: payload
  }),

  // Drawer
  [T.TAG_DRAWER_OPEN]: state => ({
    ...state,
    drawerOpen: true
  }),

  [T.TAG_DRAWER_CLOSE]: state => ({
    ...state,
    drawerOpen: false
  }),

  [T.TAG_DRAWER_TOGGLE]: state => ({
    ...state,
    drawerOpen: !state.drawerOpen
  }),


  // Fetch
  [T.FETCH_TAGS_REQUEST]: state => ({
    ...state,
    isFetching: true
  }),

  [T.FETCH_TAGS_SUCCESS]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    results: payload.result.tags
  }),

  [T.FETCH_TAGS_FAILURE]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    error: payload
  }),


  // Add
  [T.ADD_TAG_REQUEST]: (state: TagState): TagState => ({
    ...state,
    isAdding: true
  }),

  [T.ADD_TAG_SUCCESS]: (state: TagState, action: AddTagSuccessAction): TagState => ({
    ...state,
    isAdding: false,
    results: [...state.results, action.payload.result.tag]
  }),

  [T.ADD_TAG_FAILURE]: (state: TagState, action: AddTagFailureAction): TagState => ({
    ...state,
    isAdding: false,
    error: action.payload
  }),


  // Update
  [T.UPDATE_TAG_FAILURE]: (state, { payload }) => ({
    ...state,
    error: payload
  }),


  // Delete
  [T.DELETE_TAG_SUCCESS]: (state, { payload }) => ({
    ...state,
    results: state.results.filter(id => id !== payload)
  }),

  [T.DELETE_TAG_FAILURE]: (state, { payload }) => ({
    ...state,
    error: payload
  })
}, initialState);
