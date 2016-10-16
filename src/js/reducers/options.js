// @flow
import { handleActions } from "redux-actions";
import * as Options from "../actions/options";
import type {
  OptionsState,
  UpdateThemeSuccessAction
} from "../types/options";

const initialState: OptionsState = {
  isProfileUpdating: false,
  theme: "dark",
  isThemeUpdating: false
};

export default handleActions({
  // Profile
  [Options.UPDATE_PROFILE_REQUEST]: (state: OptionsState) => ({
    ...state,
    isProfileUpdating: true
  }),

  [Options.UPDATE_PROFILE_SUCCESS]: (state: OptionsState) => ({
    ...state,
    isProfileUpdating: false
  }),

  [Options.UPDATE_PROFILE_FAILURE]: (state: OptionsState) => ({
    ...state,
    isProfileUpdating: false
  }),


  // Theme
  [Options.UPDATE_THEME_REQUEST]: (state: OptionsState) => ({
    ...state,
    isThemeUpdating: true
  }),

  [Options.UPDATE_THEME_SUCCESS]: (state: OptionsState, action: UpdateThemeSuccessAction) => ({
    ...state,
    theme: action.payload,
    isThemeUpdating: false
  }),

  [Options.UPDATE_THEME_FAILURE]: (state: OptionsState) => ({
    ...state,
    isThemeUpdating: false
  })
}, initialState);
