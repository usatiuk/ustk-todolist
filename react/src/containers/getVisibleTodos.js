import { VisibilityFilters } from '../actions/todos';

export default function getVisibleTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos.filter(todo => todo);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => todo).filter(todo => !todo.completed);
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo).filter(todo => todo.completed);
    default:
      return todos.filter(todo => todo);
  }
}
