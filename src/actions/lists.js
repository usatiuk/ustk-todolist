import { API_ROOT, getToken } from './util';

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
function addListToState(list) {
  return { type: ADD_LIST, list };
}

export function addList(name) {
  return async (dispatch) => {
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
    dispatch(addListToState(list));
    dispatch(changeList(list.id));
    dispatch(validateLists());
  };
}

function removeListFromState(id) {
  return { type: REMOVE_LIST, id };
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
      dispatch(removeListFromState(list));
      state = getState();
      const newList = state.lists.lists[Object.keys(state.lists.lists)[0]]
        ? state.lists.lists[Object.keys(state.lists.lists)[0]].id
        : '';
      dispatch(changeList(newList));
    }
    dispatch(validateLists());
  };
}

function editListNameInState(id, name) {
  return { type: EDIT_LIST_NAME, id, name };
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
      dispatch(editListNameInState(list, name));
    }
    dispatch(validateLists());
  };
}

export function fetchLists() {
  return async (dispatch) => {
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

export function loadLists() {
  return async (dispatch) => {
    dispatch(requestLists());

    try {
      const listsJson = localStorage.getTodo('lists');
      const listsObj = JSON.parse(listsJson);
      dispatch(recieveLists(listsObj));
      dispatch(changeList(listsObj[Object.keys(listsObj)[0]].id));
    } catch (e) {
      localStorage.removeItem('lists');
    }

    dispatch(fetchLists());
  };
}
