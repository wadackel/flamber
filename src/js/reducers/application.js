// @flow
import { handleActions } from "redux-actions";
import * as A from "../actions/application";

import type {
  AppState
} from "../types/application";


const initialState: AppState = {
  isCreating: false,
  isDeleting: false,
  isMenuOpen: false,
  error: null
};


export default handleActions({
  // Create
  [A.CREATE_APP_REQUEST]: state => ({
    ...state,
    isCreating: true
  }),

  [A.CREATE_APP_SUCCESS]: state => ({
    ...state,
    isCreating: false,
    error: null
  }),

  [A.CREATE_APP_FAILURE]: (state, { payload }) => ({
    ...state,
    isCreating: false,
    error: payload
  }),


  // TODO: Delete all application data
  [A.DELETE_APP_REQUEST]: state => ({
    ...state,
    isDeleting: true
  }),

  [A.DELETE_APP_SUCCESS]: state => ({
    ...state,
    isDeleting: false
  }),

  [A.DELETE_APP_FAILURE]: state => ({
    ...state,
    isDeleting: false
  }),


  // Menu
  [A.APP_MENU_OPEN]: (state: AppState): AppState => ({
    ...state,
    isMenuOpen: true
  }),

  [A.APP_MENU_CLOSE]: (state: AppState): AppState => ({
    ...state,
    isMenuOpen: false
  }),

  [A.APP_MENU_TOGGLE]: (state: AppState): AppState => ({
    ...state,
    isMenuOpen: !state.isMenuOpen
  })
}, initialState);
