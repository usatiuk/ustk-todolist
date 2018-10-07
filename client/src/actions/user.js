import {
  START_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  VALIDATE_USER,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  RESET_USER,
  LOGOUT,
  EDIT_START,
  EDIT_SUCCESS,
  EDIT_FAIL,
  RESET_EDIT,
} from './defs';

import { API_ROOT, getToken, setToken } from './util';
import { fetchLists } from './lists';

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
    if (getToken()) {
      const response = await fetch(`${API_ROOT}/users/user`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'content-type': 'application/json',
        },
        method: 'GET',
      });
      const json = await response.json();
      if (json.success) {
        dispatch(loginSuccess(json.data));
        dispatch(fetchLists());
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
      setToken(json.data.jwt);
      dispatch(loginSuccess(json.data));
      dispatch(fetchLists());
    } else {
      dispatch(loginFail(json.error));
    }
  };
}

export function loginJWT(jwt) {
  return async dispatch => {
    dispatch(startLogin());
    const response = await fetch(`${API_ROOT}/users/user`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    });
    const json = await response.json();
    if (json.success) {
      setToken(jwt);
      dispatch(loginSuccess(json.data));
      dispatch(fetchLists());
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
      setToken(json.data.jwt);
      dispatch(signupSuccess(json.data));
      dispatch(fetchLists());
    } else {
      dispatch(signupFail(json.error));
    }
  };
}


function startEdit(user) {
  return { type: EDIT_START, user };
}

function editSuccess(user) {
  return { type: EDIT_SUCCESS, user };
}

function editFail(error) {
  return { type: EDIT_FAIL, error };
}

export function edit(user) {
  return async dispatch => {
    dispatch(startEdit());
    const response = await fetch(`${API_ROOT}/users/user`, {
      body: JSON.stringify(user),
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'content-type': 'application/json',
      },
      method: 'PATCH',
    });
    const json = await response.json();
    if (json.success) {
      dispatch(editSuccess(json.data));
    } else {
      dispatch(editFail(json.error));
    }
  };
}

export function deleteUser() {
  return async dispatch => {
    await fetch(`${API_ROOT}/users/user`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'content-type': 'application/json',
      },
      method: 'DELETE',
    });
    dispatch(reset());
  };
}


export function resetEdit() {
  return { type: RESET_EDIT };
}

export function reset() {
  return { type: RESET_USER };
}

export function logout() {
  return async dispatch => {
    dispatch({ type: LOGOUT });
  };
}
