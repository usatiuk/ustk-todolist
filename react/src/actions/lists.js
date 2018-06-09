import { API_ROOT, getToken } from './util';
import { RECIEVE_TODOS } from './todos';

export const ADD_LIST = 'ADD_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';
export const EDIT_LIST_NAME = 'EDIT_LIST_NAME';
export const RECIEVE_LISTS = 'RECIEVE_LISTS';
export const REQUEST_LISTS = 'REQUEST_LISTS';
export const INVALIDATE_LISTS = 'INVALIDATE_LISTS';
export const VALIDATE_LISTS = 'VALIDATE_LISTS';
export const CHANGE_LIST = 'CHANGE_LIST';
export const START_CREATE_LIST = 'START_CREATE_LIST';
export const START_EDIT_LIST = 'START_EDIT_LIST';
export const STOP_CREATE_LIST = 'STOP_CREATE_LIST';
export const STOP_EDIT_LIST = 'STOP_EDIT_LIST';

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

export function startCreateList() {
  return { type: START_CREATE_LIST };
}
export function startEditList() {
  return { type: START_EDIT_LIST };
}
export function stopCreateList() {
  return { type: STOP_CREATE_LIST };
}
export function stopEditList() {
  return { type: STOP_EDIT_LIST };
}

export function addList(name) {
  return async dispatch => {
    dispatch(invalidateLists());
    const response = await fetch(`${API_ROOT}/lists`, {
      body: JSON.stringify({ name }),
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'content-type': 'application/json',
      },
      method: 'POST',
    });
    const json = await response.json();
    const list = json.data;
    dispatch({ type: ADD_LIST, list });
    dispatch(changeList(list.id));
    dispatch(validateLists());
  };
}

export function removeList() {
  return async (dispatch, getState) => {
    let state = getState();
    const { list } = state.lists;
    dispatch(invalidateLists());
    const response = await fetch(`${API_ROOT}/lists/${list}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'content-type': 'application/json',
      },
      method: 'DELETE',
    });
    const json = await response.json();
    if (json.success) {
      dispatch({ type: REMOVE_LIST, list });
      state = getState();
      const lists = Object.values(state.lists.lists);
      const newList = lists.length ? lists[lists.length - 1].id : '';
      dispatch(changeList(newList));
    }
    dispatch(validateLists());
  };
}

export function editList(name) {
  return async (dispatch, getState) => {
    const state = getState();
    const { list } = state.lists;
    dispatch(invalidateLists());
    const response = await fetch(`${API_ROOT}/lists/${list}`, {
      body: JSON.stringify({ name }),
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'content-type': 'application/json',
      },
      method: 'PATCH',
    });
    const json = await response.json();
    if (json.success) {
      dispatch({ type: EDIT_LIST_NAME, list, name });
    }
    dispatch(validateLists());
  };
}

function normalizeTodos(lists) {
  return lists.reduce((todos, list) => {
    const listTodosObj = list.todos.reduce(
      (listTodos, todo) => ({
        ...listTodos,
        [todo.id]: { ...todo },
      }),
      {},
    );
    return { ...todos, ...listTodosObj };
  }, {});
}

export function fetchLists() {
  return async dispatch => {
    dispatch(requestLists());
    const response = await fetch(`${API_ROOT}/lists`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const json = await response.json();
    const lists = json.data;
    const listsObj = lists.reduce((obj, list) => {
      const newObj = { ...obj };
      newObj[list.id] = {
        dirty: true,
        fetching: false,
        editing: false,
        ...list,
        todos: list.todos.map(todo => todo.id),
      };
      return newObj;
    }, {});

    dispatch({ type: RECIEVE_TODOS, todos: normalizeTodos(lists) });
    dispatch(recieveLists(listsObj));
    if (lists.length !== 0) {
      dispatch(changeList(listsObj[Object.keys(listsObj)[0]].id));
    }
  };
}

export function loadLists() {
  return async dispatch => {
    dispatch(requestLists());
    dispatch(fetchLists());
  };
}
