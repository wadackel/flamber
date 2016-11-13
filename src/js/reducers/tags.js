// @flow
import { without } from "lodash";
import { handleActions } from "redux-actions";
import * as T from "../actions/tags";

import type {
  TagState,

  SetCurrentTagAction,
  FetchTagsSuccessAction,
  FetchTagsFailureAction,
  AddTagRequestAction,
  AddTagSuccessAction,
  AddTagFailureAction,
  UpdateTagFailureAction,
  DeleteTagSuccessAction,
  DeleteTagFailureAction
} from "../types/tag";

const initialState: TagState = {
  isFetching: false,
  isAdding: false,
  results: [],
  currentTag: null,
  error: null,
  drawerOpen: false
};

export default handleActions({
  // Current
  [T.SET_CURRENT_TAG]: (state: TagState, action: SetCurrentTagAction) => ({
    ...state,
    currentTag: action.payload
  }),


  // Drawer
  [T.TAG_DRAWER_OPEN]: (state: TagState): TagState => ({
    ...state,
    drawerOpen: true
  }),

  [T.TAG_DRAWER_CLOSE]: (state: TagState): TagState => ({
    ...state,
    drawerOpen: false
  }),

  [T.TAG_DRAWER_TOGGLE]: (state: TagState): TagState => ({
    ...state,
    drawerOpen: !state.drawerOpen
  }),


  // Fetch
  [T.FETCH_TAGS_REQUEST]: (state: TagState): TagState => ({
    ...state,
    isFetching: true
  }),

  [T.FETCH_TAGS_SUCCESS]: (state: TagState, action: FetchTagsSuccessAction): TagState => ({
    ...state,
    isFetching: false,
    results: action.payload.result.tags
  }),

  [T.FETCH_TAGS_FAILURE]: (state: TagState, action: FetchTagsFailureAction): TagState => ({
    ...state,
    isFetching: false,
    error: action.payload
  }),


  // Add
  [T.ADD_TAG_REQUEST]: (state: TagState, action: AddTagRequestAction): TagState => ({
    ...state,
    isAdding: true,
    results: [...state.results, action.payload.id]
  }),

  [T.ADD_TAG_SUCCESS]: (state: TagState, action: AddTagSuccessAction): TagState => ({
    ...state,
    isAdding: false,
    results: [...without(state.results, action.meta.id), action.payload.result.tag]
  }),

  [T.ADD_TAG_FAILURE]: (state: TagState, action: AddTagFailureAction): TagState => ({
    ...state,
    isAdding: false,
    error: action.payload,
    results: action.meta
      ? without(state.results, action.meta.id)
      : state.results
  }),


  // Update
  [T.UPDATE_TAG_FAILURE]: (state: TagState, action: UpdateTagFailureAction): TagState => ({
    ...state,
    error: action.payload
  }),


  // Delete
  [T.DELETE_TAG_SUCCESS]: (state: TagState, action: DeleteTagSuccessAction): TagState => ({
    ...state,
    results: without(state.results, action.payload.result.tag)
  }),

  [T.DELETE_TAG_FAILURE]: (state: TagState, action: DeleteTagFailureAction): TagState => ({
    ...state,
    error: action.payload
  })
}, initialState);
