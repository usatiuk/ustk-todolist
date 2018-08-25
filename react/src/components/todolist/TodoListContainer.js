import { connect } from 'react-redux';
import TodoList from './TodoList';
import { toggleTodo, removeTodo, editTodo } from '../../actions/todos';

import getVisibleTodos from './getVisibleTodos';

function mapStateToProps(state) {
  return {
    todos: state.lists.list
      ? getVisibleTodos(
          state.lists.lists[state.lists.list].todos.map(
            id => state.todos.todos[id],
          ),
          state.visibilityFilter,
        )
      : [],
    dirty: state.todos.dirty,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleTodo: id => dispatch(toggleTodo(id)),
    removeTodo: id => dispatch(removeTodo(id)),
    editTodo: (id, text) => dispatch(editTodo(id, text)),
  };
}

const TodosContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);

export default TodosContainer;
