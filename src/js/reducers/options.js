// @flow
import { handleActions } from "redux-actions";
import * as O from "../actions/options";
import type {
  OptionsState,
  UpdateThemeSuccessAction,
  UpdateBoardsLayoutRequestAction,
  UpdateBoardsLayoutSuccessAction
} from "../types/options";

const initialState: OptionsState = {
  isProfileUpdating: false,

  theme: "dark",
  isThemeUpdating: false,

  boardsLayout: "grid",
  isBoardsLayoutUpdating: false,

  itemsLayout: "gallery",
  isItemsLayoutUpdating: false
};

export default handleActions({
  // Profile
  [O.UPDATE_PROFILE_REQUEST]: (state: OptionsState) => ({
    ...state,
    isProfileUpdating: true
  }),

  [O.UPDATE_PROFILE_SUCCESS]: (state: OptionsState) => ({
    ...state,
    isProfileUpdating: false
  }),

  [O.UPDATE_PROFILE_FAILURE]: (state: OptionsState) => ({
    ...state,
    isProfileUpdating: false
  }),


  // Theme
  [O.UPDATE_THEME_REQUEST]: (state: OptionsState) => ({
    ...state,
    isThemeUpdating: true
  }),

  [O.UPDATE_THEME_SUCCESS]: (state: OptionsState, action: UpdateThemeSuccessAction) => ({
    ...state,
    theme: action.payload,
    isThemeUpdating: false
  }),

  [O.UPDATE_THEME_FAILURE]: (state: OptionsState) => ({
    ...state,
    isThemeUpdating: false
  }),


  // Boards layout
  [O.UPDATE_BOARDS_LAYOUT_REQUEST]: (state: OptionsState, action: UpdateBoardsLayoutRequestAction) => ({
    ...state,
    boardsLayout: action.payload,
    isBoardsLayoutUpdating: true
  }),

  [O.UPDATE_BOARDS_LAYOUT_SUCCESS]: (state: OptionsState, action: UpdateBoardsLayoutSuccessAction) => ({
    ...state,
    boardsLayout: action.payload,
    isBoardsLayoutUpdating: false
  }),

  [O.UPDATE_BOARDS_LAYOUT_FAILURE]: (state: OptionsState) => ({
    ...state,
    isBoardsLayoutUpdating: false
  })
}, initialState);
