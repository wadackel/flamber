import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import application from "./application";
import auth from "./auth";
import settings from "./settings";
import boards from "./boards";

const rootReducer = combineReducers({
  routing: routerReducer,
  application,
  auth,
  settings,
  boards
});

export default rootReducer;
