// @flow
import { handleActions } from "redux-actions";
import * as O from "../actions/options";
import type {
  OptionsState,
  UpdateThemeSuccessAction,
  UpdateBoardsLayoutRequestAction,
  UpdateBoardsLayoutSuccessAction,
  UpdateItemsLayoutRequestAction,
  UpdateItemsLayoutSuccessAction,
  UpdateItemsSizeRequestAction,
  UpdateItemsSizeSuccessAction
} from "../types/options";

const initialState: OptionsState = {
  isProfileUpdating: false,

  theme: "dark",
  isThemeUpdating: false,

  boardsLayout: "grid",
  isBoardsLayoutUpdating: false,

  itemsLayout: "gallery",
  isItemsLayoutUpdating: false,

  itemsSize: 300,
  isItemsSizeUpdating: false
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
  }),


  // Items layout
  [O.UPDATE_ITEMS_LAYOUT_REQUEST]: (state: OptionsState, action: UpdateItemsLayoutRequestAction) => ({
    ...state,
    itemsLayout: action.payload,
    isItemsLayoutUpdating: true
  }),

  [O.UPDATE_ITEMS_LAYOUT_SUCCESS]: (state: OptionsState, action: UpdateItemsLayoutSuccessAction) => ({
    ...state,
    itemsLayout: action.payload,
    isItemsLayoutUpdating: false
  }),

  [O.UPDATE_ITEMS_LAYOUT_FAILURE]: (state: OptionsState) => ({
    ...state,
    isItemsLayoutUpdating: false
  }),


  // Items size
  [O.UPDATE_ITEMS_SIZE_REQUEST]: (state: OptionsState, action: UpdateItemsSizeRequestAction) => ({
    ...state,
    itemsSize: action.payload,
    isItemsSizeUpdating: true
  }),

  [O.UPDATE_ITEMS_SIZE_SUCCESS]: (state: OptionsState, action: UpdateItemsSizeSuccessAction) => ({
    ...state,
    itemsSize: action.payload,
    isItemsSizeUpdating: false
  }),

  [O.UPDATE_ITEMS_SIZE_FAILURE]: (state: OptionsState) => ({
    ...state,
    isItemsSizeUpdating: false
  })
}, initialState);
