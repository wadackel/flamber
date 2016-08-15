/* eslint-disable */
import { handleActions } from "redux-actions";
import * as Tags from "../actions/tags";

const initialState = {
  isFetching: false,
  isAdding: false,
  results: [],
  currentTag: null,
  error: null,
  drawerOpen: false
};

export default handleActions({
  // Drawer
  [Tags.TAG_DRAWER_OPEN]: state => ({
    ...state,
    drawerOpen: true
  }),

  [Tags.TAG_DRAWER_CLOSE]: state => ({
    ...state,
    drawerOpen: false
  }),

  [Tags.TAG_DRAWER_TOGGLE]: state => ({
    ...state,
    drawerOpen: !state.drawerOpen
  }),


  // Fetch
  [Tags.FETCH_TAGS_REQUEST]: state => ({
    ...state,
    isFetching: true
  }),

  [Tags.FETCH_TAGS_SUCCESS]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    results: payload.result.tags
  }),

  [Tags.FETCH_TAGS_FAILURE]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    error: payload
  }),


  // Add
  [Tags.ADD_TAG_REQUEST]: state => ({
    ...state,
    isAdding: true
  }),

  [Tags.ADD_TAG_SUCCESS]: (state, { payload }) => ({
    ...state,
    isAdding: false,
    results: [...state.results, payload.result.tag]
  }),

  [Tags.ADD_TAG_FAILURE]: (state, { payload }) => ({
    ...state,
    isAdding: false,
    error: payload
  }),


  // Update
  [Tags.UPDATE_TAG_FAILURE]: (state, { payload }) => ({
    ...state,
    error: payload
  }),


  // Delete
  [Tags.DELETE_TAG_SUCCESS]: (state, { payload }) => ({
    ...state,
    results: state.results.filter(id => id !== payload)
  }),

  [Tags.DELETE_TAG_FAILURE]: (state, { payload }) => ({
    ...state,
    error: payload
  })
}, initialState);
