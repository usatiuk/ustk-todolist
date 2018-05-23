import {
  ADD_ITEM,
  REMOVE_ITEM,
  TOGGLE_ITEM,
  RECIEVE_TODOS,
  REQUEST_TODOS,
  INVALIDATE_TODOS,
  VALIDATE_TODOS
} from "../actions";

export default function items(
  state = { dirty: true, fetching: false, todos: [] },
  action
) {
  switch (action.type) {
    case RECIEVE_TODOS:
      return {
        ...state,
        dirty: false,
        fetching: false,
        todos: action.todos
      };
    case ADD_ITEM:
      return {
        ...state,
        todos: [...state.todos, action.todo]
      };
    case INVALIDATE_TODOS:
      return {
        ...state,
        dirty: true
      };
    case VALIDATE_TODOS:
      return {
        ...state,
        dirty: false
      };
    case REQUEST_TODOS:
      return {
        ...state,
        fetching: true
      };
    case REMOVE_ITEM:
      return {
        ...state,
        todos: state.todos.filter(item => item.id !== action.id)
      };
    case TOGGLE_ITEM: {
      const itemsArray = [...state.todos];
      itemsArray.some((item, i) => {
        if (item.id === action.id) {
          const newItem = { ...item };
          newItem.completed = !item.completed;
          itemsArray[i] = newItem;
          return true;
        }
        return false;
      });
      return { ...state, todos: itemsArray };
    }
    default:
      return state;
  }
}
