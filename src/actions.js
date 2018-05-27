const API_ROOT = 'http://localhost:4000';

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

function toggleTodoInList(id) {
  return { type: TOGGLE_TODO, id };
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
function invalidateTodos() {
  return { type: INVALIDATE_TODOS };
}
function validateTodos() {
  return { type: VALIDATE_TODOS };
}

function addTodoToList(todo) {
  return { type: ADD_TODO, todo };
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
          'content-type': 'application/json',
        },
        method: 'POST',
      });
      const json = await response.json();
      const todo = json.data;
      dispatch(addTodoToList(todo));
      dispatch(validateTodos());
    }
  };
}

function removeTodoFromList(id) {
  return { type: REMOVE_TODO, id };
}

export function removeTodo(id) {
  return async (dispatch) => {
    dispatch(invalidateTodos());
    const response = await fetch(`${API_ROOT}/todos/${id}`, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'DELETE',
    });
    const json = await response.json();
    if (json.success) {
      dispatch(removeTodoFromList(id));
    }
    dispatch(validateTodos());
  };
}

export function toggleTodo(id) {
  return async (dispatch, getState) => {
    dispatch(invalidateTodos());
    const state = getState();
    const listObj = state.lists.lists[state.lists.list];
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
      dispatch(toggleTodoInList(id));
    }
    dispatch(validateTodos());
  };
}

function editTodoInList(id, todo) {
  return { type: EDIT_TODO, id, todo };
}

export function editTodo(id, text) {
  return async (dispatch) => {
    dispatch(invalidateTodos());
    const response = await fetch(`${API_ROOT}/todos/${id}`, {
      body: JSON.stringify({ text }),
      headers: {
        'content-type': 'application/json',
      },
      method: 'PATCH',
    });
    const json = await response.json();
    if (json.success) {
      const todo = json.data;
      dispatch(editTodoInList(id, todo));
    }
    dispatch(validateTodos());
  };
}

export function fetchTodos(list) {
  return async (dispatch) => {
    dispatch(requestTodos(list));
    const response = await fetch(`${API_ROOT}/lists/${list.id}/todos`);
    const json = await response.json();
    const todos = json.data;
    dispatch(recieveTodos(list, todos));
  };
}

export const ADD_LIST = 'ADD_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';
export const EDIT_LIST = 'EDIT_LIST';
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

function addListToState(list) {
  return { type: ADD_LIST, list };
}

export function addList(name) {
  return async (dispatch) => {
    dispatch(invalidateLists());
    const response = await fetch(`${API_ROOT}/lists`, {
      body: JSON.stringify({ name }),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    });
    const json = await response.json();
    const list = json.data;
    dispatch(addListToState(list));
    dispatch(changeList(list.id));
    dispatch(validateLists());
  };
}

function removeListFromState(id) {
  return { type: REMOVE_LIST, id };
}

export function removeList(id) {
  return async (dispatch, getState) => {
    dispatch(invalidateLists());
    const response = await fetch(`${API_ROOT}/lists/${id}`, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'DELETE',
    });
    const json = await response.json();
    if (json.success) {
      dispatch(removeListFromState(id));
      const state = getState();
      const list = state.lists.lists[Object.keys(state.lists.lists)[0]]
        ? state.lists.lists[Object.keys(state.lists.lists)[0]].id
        : '';
      dispatch(changeList(list));
    }
    dispatch(validateLists());
  };
}

function editListInState(id, list) {
  return { type: EDIT_LIST, id, list };
}

export function editList(id, name) {
  return async (dispatch) => {
    dispatch(invalidateLists());
    const response = await fetch(`${API_ROOT}/lists/${id}`, {
      body: JSON.stringify({ name }),
      headers: {
        'content-type': 'application/json',
      },
      method: 'PATCH',
    });
    const json = await response.json();
    if (json.success) {
      const list = json.data;
      dispatch(editListInState(id, list));
    }
    dispatch(validateLists());
  };
}

export function fetchLists() {
  return async (dispatch) => {
    dispatch(requestLists());

    try {
      const listsJson = localStorage.getTodo('lists');
      const listsObj = JSON.parse(listsJson);
      dispatch(recieveLists(listsObj));
      dispatch(changeList(listsObj[Object.keys(listsObj)[0]].id));
    } catch (e) {
      localStorage.setItem('lists', JSON.stringify({}));
    }

    const response = await fetch(`${API_ROOT}/lists`);
    const json = await response.json();
    const lists = json.data;
    const listsObj = lists.reduce((obj, list) => {
      const newObj = { ...obj };
      newObj[list.id] = list;
      return newObj;
    }, {});

    dispatch(recieveLists(listsObj));
    if (lists.length !== 0) {
      dispatch(changeList(listsObj[Object.keys(listsObj)[0]].id));
    }
    localStorage.setItem('lists', JSON.stringify(listsObj));
  };
}
