import {
  CHANGE_LIST,
  INVALIDATE_LISTS,
  VALIDATE_LISTS,
  REQUEST_LISTS,
  RECIEVE_LISTS,
  ADD_LIST,
  REMOVE_LIST,
  EDIT_LIST_NAME,
  START_CREATE_LIST,
  START_EDIT_LIST,
  STOP_CREATE_LIST,
  STOP_EDIT_LIST,
} from '../actions/lists';
import {
  ADD_TODO,
  INVALIDATE_TODOS,
  VALIDATE_TODOS,
  REQUEST_TODOS,
  RECIEVE_TODOS,
  REMOVE_TODO,
  TOGGLE_TODO,
  EDIT_TODO,
} from '../actions/todos';
import list from './list';

export default function lists(
  state = {
    dirty: true,
    fetching: false,
    lists: null,
    loaded: false,
    creating: false,
    list: null,
  },
  action,
) {
  switch (action.type) {
    case CHANGE_LIST:
      return { ...state, list: action.list };
    case RECIEVE_LISTS:
      return {
        ...state,
        dirty: false,
        loaded: true,
        fetching: false,
        lists: action.lists,
      };
    case START_CREATE_LIST:
      return {
        ...state,
        creating: true,
      };
    case STOP_CREATE_LIST:
      return {
        ...state,
        creating: false,
      };
    case ADD_LIST:
      return {
        ...state,
        creating: false,
        lists: { ...state.lists, [action.list.id]: action.list },
      };
    case REMOVE_LIST: {
      const newLists = { ...state.lists };
      delete newLists[action.id];
      return {
        ...state,
        lists: newLists,
      };
    }
    case START_EDIT_LIST: {
      return {
        ...state,
        lists: {
          ...state.lists,
          [state.list]: {
            ...state.lists[state.list],
            editing: true,
          },
        },
      };
    }
    case STOP_EDIT_LIST: {
      return {
        ...state,
        lists: {
          ...state.lists,
          [state.list]: {
            ...state.lists[state.list],
            editing: false,
          },
        },
      };
    }
    case EDIT_LIST_NAME: {
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.id]: {
            ...state.lists[action.id],
            name: action.name,
            editing: false,
          },
        },
      };
    }
    case INVALIDATE_LISTS:
      return {
        ...state,
        dirty: true,
      };
    case VALIDATE_LISTS:
      return {
        ...state,
        dirty: false,
      };
    case REQUEST_LISTS:
      return {
        ...state,
        fetching: true,
      };
    case RECIEVE_TODOS:
    case ADD_TODO:
    case EDIT_TODO:
    case INVALIDATE_TODOS:
    case VALIDATE_TODOS:
    case REQUEST_TODOS:
    case REMOVE_TODO:
    case TOGGLE_TODO:
      return {
        ...state,
        lists: {
          ...state.lists,
          [state.list]: list(state.lists[state.list], action),
        },
      };
    default:
      return state;
  }
}
