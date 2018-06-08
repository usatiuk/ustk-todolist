import localforage from 'localforage';

export const API_ROOT = '/api';

export async function getToken() {
  const user = await localforage.getItem('user');
  return user ? user.jwt : null;
}
