import { combineReducers } from "redux";

import items from "./items";
import visibilityFilter from "./visibilityFilter";

const todoApp = combineReducers({
  items,
  visibilityFilter
});

export default todoApp;
