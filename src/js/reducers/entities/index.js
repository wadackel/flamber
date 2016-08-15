import { combineReducers } from "redux";
import boards from "./boards";
import items from "./items";
import tags from "./tags";

export default combineReducers({
  boards,
  items,
  tags
});
