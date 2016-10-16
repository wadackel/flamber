// @flow
import { handleActions } from "redux-actions";
import * as Options from "../actions/options";
import type { OptionsState } from "../types/options";

const initialState: OptionsState = {
  theme: "dark",
  isThemeUpdating: false,
  isProfileUpdating: false
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
  })
}, initialState);
