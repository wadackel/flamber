import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import entities from "./entities/";
import application from "./application";
import auth from "./auth";
import boards from "./boards";
import items from "./items";
import notifications from "./notifications";
import settings from "./settings";
import options from "./options";
import tags from "./tags";
import feeds from "./feeds";

const rootReducer = combineReducers({
  routing: routerReducer,
  entities,
  application,
  auth,
  boards,
  items,
  notifications,
  settings,
  options,
  tags,
  feeds
});

export default rootReducer;
