import localforage from 'localforage';
import { API_ROOT, getToken } from './util';
import { loadLists } from './lists';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const LOGOUT = 'LOGOUT';
export const START_LOGIN = 'INVALIDATE_USER';
export const REQUEST_USER = 'REQUEST_USER';
export const VALIDATE_USER = 'VALIDATE_USER';
export const RESET_USER = 'RESET_USER';

function startLogin() {
  return { type: START_LOGIN };
}

function loginSuccess(user) {
  return { type: LOGIN_SUCCESS, user };
}

function loginFail(error) {
  return { type: LOGIN_FAIL, error };
}

function validateUser() {
  return { type: VALIDATE_USER };
}

export function loadUser() {
  return async dispatch => {
    if (await getToken()) {
      const user = await localforage.getItem('user');
      dispatch(loginSuccess(user));
      dispatch(loadLists());

      const response = await fetch(`${API_ROOT}/users/user`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'content-type': 'application/json',
        },
        method: 'GET',
      });
      const json = await response.json();
      if (json.success) {
        await localforage.setItem('user', json.data);
        dispatch(loginSuccess(json.data));
        dispatch(loadLists());
      } else {
        dispatch(loginFail(json.error));
      }
    } else {
      dispatch(validateUser());
    }
  };
}

export function login(user) {
  return async dispatch => {
    dispatch(startLogin());
    const response = await fetch(`${API_ROOT}/users/login`, {
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    });
    const json = await response.json();
    if (json.success) {
      await localforage.setItem('user', json.data);
      dispatch(loginSuccess(json.data));
      dispatch(loadLists());
    } else {
      dispatch(loginFail(json.error));
    }
  };
}

function signupSuccess(user) {
  return { type: SIGNUP_SUCCESS, user };
}

function signupFail(error) {
  return { type: SIGNUP_FAIL, error };
}

export function signup(user) {
  return async dispatch => {
    dispatch(startLogin());
    const response = await fetch(`${API_ROOT}/users`, {
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    });
    const json = await response.json();
    if (json.success) {
      await await localforage.setItem('user', json.data);
      dispatch(signupSuccess(json.data));
      dispatch(loadLists());
    } else {
      dispatch(signupFail(json.error));
    }
  };
}

export function reset() {
  return { type: RESET_USER };
}

export function logout() {
  return async dispatch => {
    await localforage.removeItem('user');
    await localforage.removeItem('lists');
    await localforage.removeItem('items');
    dispatch({ type: LOGOUT });
  };
}
