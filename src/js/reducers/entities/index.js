import { combineReducers } from "redux";
import boards from "./boards";
import items from "./items";
import tags from "./tags";
import feeds from "./feeds";

export default combineReducers({
  boards,
  items,
  tags,
  feeds
});
