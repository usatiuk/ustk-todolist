import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  START_LOGIN,
  LOGOUT,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  VALIDATE_USER,
  RESET_USER,
} from '../actions/defs';

export default function user(
  state = {
    dirty: true,
    fetching: false,
    user: null,
    loaded: false,
    errors: null,
  },
  action,
) {
  switch (action.type) {
    case VALIDATE_USER:
      return {
        ...state,
        dirty: false,
      };
    case START_LOGIN:
      return {
        ...state,
        fetching: true,
      };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        errors: null,
        dirty: false,
        loaded: true,
        fetching: false,
      };
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        errors: action.error,
        dirty: false,
        fetching: false,
        loaded: false,
      };
    case RESET_USER:
      return {
        ...state,
        fetching: false,
        loaded: false,
        user: null,
        errors: null,
      };
    case LOGOUT:
      return {
        ...state,
        loaded: false,
        user: null,
      };
    default:
      return state;
  }
}
