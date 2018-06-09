export const API_ROOT = '/api';

let token = null;

export function setToken(_token) {
  token = _token;
}

export function getToken() {
  return token;
}
