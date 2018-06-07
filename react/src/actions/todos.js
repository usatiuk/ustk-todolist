import { API_ROOT, getToken } from './util';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
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

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}

function invalidateTodos() {
  return { type: INVALIDATE_TODOS };
}
function validateTodos() {
  return { type: VALIDATE_TODOS };
}

export function addTodo(text) {
  return async (dispatch, getState) => {
    const state = getState();
    const { list } = state.lists;
    if (list) {
      dispatch(invalidateTodos());
      const response = await fetch(`${API_ROOT}/lists/${list}/todos`, {
        body: JSON.stringify({ text }),
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'content-type': 'application/json',
        },
        method: 'POST',
      });
      const json = await response.json();
      const todo = json.data;
      dispatch({ type: ADD_TODO, todo });
      dispatch(validateTodos());
    }
  };
}

export function removeTodo(id) {
  return async dispatch => {
    dispatch(invalidateTodos());
    const response = await fetch(`${API_ROOT}/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'content-type': 'application/json',
      },
      method: 'DELETE',
    });
    const json = await response.json();
    if (json.success) {
      dispatch({ type: REMOVE_TODO, id });
    }
    dispatch(validateTodos());
  };
}

export function toggleTodo(id) {
  return async (dispatch, getState) => {
    dispatch(invalidateTodos());
    const state = getState();
    const todoObj = state.todos.todos[id];
    const completed = !todoObj.completed;
    const response = await fetch(`${API_ROOT}/todos/${id}`, {
      body: JSON.stringify({ completed }),
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'content-type': 'application/json',
      },
      method: 'PATCH',
    });
    const json = await response.json();
    if (json.success) {
      dispatch({ type: TOGGLE_TODO, id });
    }
    dispatch(validateTodos());
  };
}

export function editTodo(id, text) {
  return async dispatch => {
    dispatch(invalidateTodos());
    const response = await fetch(`${API_ROOT}/todos/${id}`, {
      body: JSON.stringify({ text }),
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'content-type': 'application/json',
      },
      method: 'PATCH',
    });
    const json = await response.json();
    if (json.success) {
      const todo = json.data;
      dispatch({ type: EDIT_TODO, id, todo });
    }
    dispatch(validateTodos());
  };
}

export function fetchTodos(list) {
  return async dispatch => {
    dispatch({ type: REQUEST_TODOS, list });
    const response = await fetch(`${API_ROOT}/todos`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const json = await response.json();
    const todos = json.data;
    dispatch({ type: RECIEVE_TODOS, todos });
  };
}
