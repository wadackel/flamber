import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import auth from "./auth";
import settings from "./settings";

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  settings
});

export default rootReducer;
