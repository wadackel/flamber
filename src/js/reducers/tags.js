/* eslint-disable */
import { handleActions } from "redux-actions";
import * as Tags from "../actions/tags";

const initialState = {
  isAdding: false,
  results: [],
  currentTag: null,
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
  })
}, initialState);
