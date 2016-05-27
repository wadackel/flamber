"use strict";

import assign from "object-assign";
import {
  AUTH_COMPLETE,
  AUTH_REQUEST,
  AUTH_ERROR
} from "../actions/auth";

const initialState = {
  isFetching: false,
  authenticated: false,
  authenticateURL: ""
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_REQUEST:
      return assign({}, state, {
        isFetching: true
      });

    case AUTH_COMPLETE:
      return assign({}, state, {
        isFetching: false,
        authenticated: true
      });

    case AUTH_ERROR:
      return assign({}, state, {
        isFetching: false,
        authenticated: false
      });

    default:
      return state;
  }
}
