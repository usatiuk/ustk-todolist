import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import lists from './lists';
import visibilityFilter from './visibilityFilter';
import user from './user';
import todos from './todos';

const todoApp = combineReducers({
  lists,
  todos,
  visibilityFilter,
  form: formReducer,
  user,
});

export default todoApp;
