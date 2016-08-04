import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import entities from "./entities/";
import application from "./application";
import auth from "./auth";
import settings from "./settings";
import boards from "./boards";
import items from "./items";

const rootReducer = combineReducers({
  routing: routerReducer,
  entities,
  application,
  auth,
  settings,
  boards,
  items
});

export default rootReducer;
