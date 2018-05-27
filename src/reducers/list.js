import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  RECIEVE_TODOS,
  REQUEST_TODOS,
  INVALIDATE_TODOS,
  VALIDATE_TODOS,
  EDIT_TODO,
} from '../actions';

export default function todos(state = { dirty: true, fetching: false, todos: [] }, action) {
  switch (action.type) {
    case RECIEVE_TODOS:
      return {
        ...state,
        dirty: false,
        fetching: false,
        todos: action.todos,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.todo],
      };
    case INVALIDATE_TODOS:
      return {
        ...state,
        dirty: true,
      };
    case VALIDATE_TODOS:
      return {
        ...state,
        dirty: false,
      };
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => (todo.id === action.id ? action.todo : todo)),
      };
    case REQUEST_TODOS:
      return {
        ...state,
        fetching: true,
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };
    case TOGGLE_TODO: {
      return {
        ...state,
        todos: state.todos.map(todo => (todo.id === action.id ? { ...todo, completed: !todo.completed } : todo)),
      };
    }
    default:
      return state;
  }
}
