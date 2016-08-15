/* eslint-disable */
import { handleActions } from "redux-actions";
import * as Tags from "../actions/tags";

const initialState = {
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
  })
}, initialState);
