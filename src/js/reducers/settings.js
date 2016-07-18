import { handleActions } from "redux-actions";
import * as Themes from "../constants/themes";
import {
  FETCH_SETTINGS_REQUEST,
  FETCH_SETTINGS_SUCCESS,
  FETCH_SETTINGS_FAILURE,
  UPDATE_SETTINGS_REQUEST,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_FAILURE
} from "../actions/settings";

export const initialState = {
  isFetching: false,
  theme: Themes.DEFAULT
};

export default handleActions({
  // Fetch
  [FETCH_SETTINGS_REQUEST]: state => ({
    ...state,
    isFetching: true
  }),

  [FETCH_SETTINGS_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    isFetching: false
  }),

  [FETCH_SETTINGS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload
  }),

  // Update
  [UPDATE_SETTINGS_REQUEST]: state => ({
    ...state,
    isFetching: true
  }),

  [UPDATE_SETTINGS_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    isFetching: false
  }),

  [UPDATE_SETTINGS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload
  })
}, initialState);
