import assign from "object-assign";
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_REQUEST,
  SIGN_IN_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE
} from "../actions/auth";

export const initialState = {
  isFetching: false,
  authenticated: false,
  authenticateURL: "",
  user: null
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    // Sign in
  case SIGN_IN_REQUEST:
    return assign({}, state, {
      isFetching: true
    });

  case SIGN_IN_SUCCESS:
    return assign({}, state, {
      isFetching: false,
      authenticated: true,
      user: action.payload
    });

  case SIGN_IN_FAILURE:
    return assign({}, state, {
      isFetching: false,
      authenticated: false,
      user: null
    });

    // Sign out
  case SIGN_OUT_REQUEST:
    return assign({}, state, {
      isFetching: true
    });

  case SIGN_OUT_SUCCESS:
    return assign({}, state, {
      isFetching: false,
      authenticated: false,
      user: null
    });

  case SIGN_OUT_FAILURE:
    return assign({}, state, {
      isFetching: false
    });

  default:
    return state;
  }
}
