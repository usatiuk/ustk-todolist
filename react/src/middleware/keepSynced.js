import { fetchLists, REQUEST_LISTS, INVALIDATE_LISTS } from '../actions/lists';

export default store => next => action => {
  next(action);
  if (action.type !== REQUEST_LISTS && typeof action !== 'function') {
    const state = store.getState();
    if (state.user.user) {
      const dirtyLists = state.lists.dirty || false;
      const dirtyTodos = state.todos.dirty || false;
      const fetchingLists = state.lists.fetching || false;
      if (
        ((dirtyLists || dirtyTodos) && !fetchingLists) ||
        action.type === INVALIDATE_LISTS
      ) {
        store.dispatch(fetchLists());
      }
    }
  }
};
