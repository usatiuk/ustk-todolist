export const API_ROOT = 'http://localhost:4000/api';

export function getToken() {
  return localStorage.getItem('jwt');
}
