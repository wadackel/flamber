// @flow
import { handleActions } from "redux-actions";
import * as O from "../actions/options";
import type {
  OptionsState,
  FetchOptionsSuccessAction,
  UpdateThemeSuccessAction,
  UpdateBoardsLayoutRequestAction,
  UpdateBoardsLayoutSuccessAction,
  UpdateBoardsOrderByRequestAction,
  UpdateBoardsOrderBySuccessAction,
  UpdateBoardsOrderRequestAction,
  UpdateBoardsOrderSuccessAction,
  UpdateItemsLayoutRequestAction,
  UpdateItemsLayoutSuccessAction,
  UpdateItemsSizeRequestAction,
  UpdateItemsSizeSuccessAction,
  UpdateItemsOrderByRequestAction,
  UpdateItemsOrderBySuccessAction,
  UpdateItemsOrderRequestAction,
  UpdateItemsOrderSuccessAction
} from "../types/options";

const initialState: OptionsState = {
  isProfileUpdating: false,

  theme: "dark",
  isThemeUpdating: false,

  boardsLayout: "grid",
  boardsOrderBy: "created_at",
  boardsOrder: "asc",
  itemsLayout: "gallery",
  itemsSize: 300,
  itemsOrderBy: "created_at",
  itemsOrder: "asc"
};

export default handleActions({
  // Fetch
  [O.FETCH_OPTIONS_SUCCESS]: (state: OptionsState, action: FetchOptionsSuccessAction) => ({
    ...state,
    ...action.payload
  }),

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
    boardsLayout: action.payload
  }),

  [O.UPDATE_BOARDS_LAYOUT_SUCCESS]: (state: OptionsState, action: UpdateBoardsLayoutSuccessAction) => ({
    ...state,
    boardsLayout: action.payload
  }),


  // Boards orderBy
  [O.UPDATE_BOARDS_ORDER_BY_REQUEST]: (state: OptionsState, action: UpdateBoardsOrderByRequestAction) => ({
    ...state,
    boardsOrderBy: action.payload
  }),

  [O.UPDATE_BOARDS_ORDER_BY_SUCCESS]: (state: OptionsState, action: UpdateBoardsOrderBySuccessAction) => ({
    ...state,
    boardsOrderBy: action.payload
  }),


  // Boards order
  [O.UPDATE_BOARDS_ORDER_REQUEST]: (state: OptionsState, action: UpdateBoardsOrderRequestAction) => ({
    ...state,
    boardsOrder: action.payload
  }),

  [O.UPDATE_BOARDS_ORDER_SUCCESS]: (state: OptionsState, action: UpdateBoardsOrderSuccessAction) => ({
    ...state,
    boardsOrder: action.payload
  }),


  // Items layout
  [O.UPDATE_ITEMS_LAYOUT_REQUEST]: (state: OptionsState, action: UpdateItemsLayoutRequestAction) => ({
    ...state,
    itemsLayout: action.payload
  }),

  [O.UPDATE_ITEMS_LAYOUT_SUCCESS]: (state: OptionsState, action: UpdateItemsLayoutSuccessAction) => ({
    ...state,
    itemsLayout: action.payload
  }),


  // Items size
  [O.UPDATE_ITEMS_SIZE_REQUEST]: (state: OptionsState, action: UpdateItemsSizeRequestAction) => ({
    ...state,
    itemsSize: action.payload
  }),

  [O.UPDATE_ITEMS_SIZE_SUCCESS]: (state: OptionsState, action: UpdateItemsSizeSuccessAction) => ({
    ...state,
    itemsSize: action.payload
  }),


  // Items orderBy
  [O.UPDATE_ITEMS_ORDER_BY_REQUEST]: (state: OptionsState, action: UpdateItemsOrderByRequestAction) => ({
    ...state,
    itemsOrderBy: action.payload
  }),

  [O.UPDATE_ITEMS_ORDER_BY_SUCCESS]: (state: OptionsState, action: UpdateItemsOrderBySuccessAction) => ({
    ...state,
    itemsOrderBy: action.payload
  }),


  // Items order
  [O.UPDATE_ITEMS_ORDER_REQUEST]: (state: OptionsState, action: UpdateItemsOrderRequestAction) => ({
    ...state,
    itemsOrder: action.payload
  }),

  [O.UPDATE_ITEMS_ORDER_SUCCESS]: (state: OptionsState, action: UpdateItemsOrderSuccessAction) => ({
    ...state,
    itemsOrder: action.payload
  })
}, initialState);
