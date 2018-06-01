import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  START_LOGIN,
  LOGOUT,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  VALIDATE_USER,
} from '../actions/user';

export default function user(
  state = {
    dirty: true,
    fetching: false,
    user: null,
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
        dirty: false,
        fetching: false,
      };
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        errors: action.error,
        dirty: false,
        fetching: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
