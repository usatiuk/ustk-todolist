import { combineReducers } from 'redux';

import lists from './lists';
import visibilityFilter from './visibilityFilter';

const todoApp = combineReducers({
  lists,
  visibilityFilter,
});

export default todoApp;
