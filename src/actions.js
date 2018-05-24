const API_ROOT = 'http://localhost:4000';

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const TOGGLE_ITEM = 'TOGGLE_ITEM';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const RECIEVE_TODOS = 'RECIEVE_TODOS';
export const REQUEST_TODOS = 'REQUEST_TODOS';
export const INVALIDATE_TODOS = 'INVALIDATE_TODOS';
export const VALIDATE_TODOS = 'VALIDATE_TODOS';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
};

function toggleItemInList(list, id) {
  return { type: TOGGLE_ITEM, list, id };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}

function requestTodos(list) {
  return { type: REQUEST_TODOS, list };
}
function recieveTodos(list, todos) {
  return { type: RECIEVE_TODOS, list, todos };
}
function invalidateTodos(list) {
  return { type: INVALIDATE_TODOS, list };
}
function validateTodos(list) {
  return { type: VALIDATE_TODOS, list };
}

function addTodoToList(list, todo) {
  return { type: ADD_ITEM, list, todo };
}

export function addItem(list, text) {
  return async (dispatch, getState) => {
    dispatch(invalidateTodos(list));
    const state = getState();
    const response = await fetch(`${API_ROOT}/lists/${state.lists.lists[list].slug}/todos`, {
      body: JSON.stringify({ text }),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    });
    const json = await response.json();
    const todo = json.data;
    dispatch(addTodoToList(list, todo));
    dispatch(validateTodos(list));
  };
}

function removeTodoFromList(list, id) {
  return { type: REMOVE_ITEM, list, id };
}

export function removeItem(list, id) {
  return async (dispatch) => {
    dispatch(invalidateTodos(list));
    const response = await fetch(`${API_ROOT}/todos/${id}`, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'DELETE',
    });
    const json = await response.json();
    if (json.success) {
      dispatch(removeTodoFromList(list, id));
    }
    dispatch(validateTodos(list));
  };
}

export function toggleItem(list, id) {
  return async (dispatch, getState) => {
    dispatch(invalidateTodos(list));
    const state = getState();
    const listObj = state.lists.lists[list];
    const todoObj = listObj.todos.find(todo => todo.id === id);
    const completed = !todoObj.completed;
    const response = await fetch(`${API_ROOT}/todos/${id}`, {
      body: JSON.stringify({ completed }),
      headers: {
        'content-type': 'application/json',
      },
      method: 'PATCH',
    });
    const json = await response.json();
    if (json.success) {
      dispatch(toggleItemInList(list, id));
    }
    dispatch(validateTodos(list));
  };
}

export function fetchTodos(list) {
  return async (dispatch) => {
    dispatch(requestTodos(list));
    const response = await fetch(`${API_ROOT}/todos`);
    const json = await response.json();
    const todos = json.data;
    dispatch(recieveTodos(list, todos));
  };
}

export const ADD_LIST = 'ADD_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';
export const RECIEVE_LISTS = 'RECIEVE_LISTS';
export const REQUEST_LISTS = 'REQUEST_LISTS';
export const INVALIDATE_LISTS = 'INVALIDATE_LISTS';
export const VALIDATE_LISTS = 'VALIDATE_LISTS';
export const CHANGE_LIST = 'CHANGE_LIST';

function requestLists() {
  return { type: REQUEST_LISTS };
}
function recieveLists(lists) {
  return { type: RECIEVE_LISTS, lists };
}
function invalidateLists() {
  return { type: INVALIDATE_LISTS };
}
function validateLists() {
  return { type: VALIDATE_LISTS };
}
export function changeList(list) {
  return { type: CHANGE_LIST, list };
}

export function fetchLists() {
  return async (dispatch) => {
    dispatch(requestLists());
    const response = await fetch(`${API_ROOT}/lists`);
    const json = await response.json();
    const lists = json.data;
    const listsObj = lists.reduce((obj, list) => {
      const newObj = { ...obj };
      newObj[list.id] = list;
      return newObj;
    }, {});
    dispatch(recieveLists(listsObj));
    dispatch(changeList(listsObj[Object.keys(listsObj)[0]].id));
  };
}
