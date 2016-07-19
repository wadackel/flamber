import { handleActions } from "redux-actions";
import {
  FETCH_BOARDS_REQUEST,
  FETCH_BOARDS_SUCCESS,
  FETCH_BOARDS_FAILURE
} from "../actions/boards";

const initialState = {
  isFetching: false,
  entities: []
};

export default handleActions({
  // Fetch
  [FETCH_BOARDS_REQUEST]: state => ({
    ...state,
    isFetching: true
  }),

  [FETCH_BOARDS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload
  }),

  [FETCH_BOARDS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload
  })
}, initialState);
