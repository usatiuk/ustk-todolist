import localforage from 'localforage';

export const API_ROOT = '/api';

export async function getToken() {
  return localforage.getItem('jwt');
}
