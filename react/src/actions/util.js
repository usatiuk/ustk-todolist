export const API_ROOT = '/api';

export function getToken() {
  return localStorage.getItem('jwt');
}
