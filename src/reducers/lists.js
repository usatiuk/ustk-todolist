import {
  CHANGE_LIST,
  INVALIDATE_LISTS,
  VALIDATE_LISTS,
  REQUEST_LISTS,
  RECIEVE_TODOS,
  ADD_ITEM,
  INVALIDATE_TODOS,
  VALIDATE_TODOS,
  REQUEST_TODOS,
  REMOVE_ITEM,
  TOGGLE_ITEM,
  RECIEVE_LISTS,
  ADD_LIST,
  REMOVE_LIST
} from "../actions";

import list from "./list";

export default function lists(
  state = { dirty: true, fetching: false, lists: {} },
  action
) {
  switch (action.type) {
    case CHANGE_LIST:
      return { ...state, list: action.list };
    case RECIEVE_LISTS:
      return {
        ...state,
        dirty: false,
        fetching: false,
        lists: action.lists
      };
    case ADD_LIST:
      return {
        ...state,
        lists: { ...state.lists, [action.list.id]: action.list }
      };
    case REMOVE_LIST:
      const newLists = { ...state.lists };
      delete newLists[action.list];
      return {
        ...state,
        lists: newLists
      };
    case INVALIDATE_LISTS:
      return {
        ...state,
        dirty: true
      };
    case VALIDATE_LISTS:
      return {
        ...state,
        dirty: false
      };
    case REQUEST_LISTS:
      return {
        ...state,
        fetching: true
      };
    case RECIEVE_TODOS:
    case ADD_ITEM:
    case INVALIDATE_TODOS:
    case VALIDATE_TODOS:
    case REQUEST_TODOS:
    case REMOVE_ITEM:
    case TOGGLE_ITEM:
      return {
        ...state,
        lists: {
          ...state.lists,
          [action.list]: list(state.lists[action.list], action)
        }
      };
    default:
      return state;
  }
}
