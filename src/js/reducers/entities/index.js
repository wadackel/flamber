import { combineReducers } from "redux";
import boards from "./boards";
import items from "./items";

export default combineReducers({
  boards,
  items
});
