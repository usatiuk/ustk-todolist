import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { toggleTodo, removeTodo, editTodo } from '../actions/todos';

import getVisibleTodos from './getVisibleTodos';

function mapStateToProps(state) {
  const { list } = state.lists;
  try {
    const listObj = state.lists.lists[list];
    const listTodos = state.lists.lists[list].todos;

    return {
      list,
      todos: getVisibleTodos(listTodos, state.visibilityFilter),
      dirty: listObj.dirty,
    };
  } catch (e) {
    return {
      list: '',
      todos: [],
      dirty: true,
    };
  }
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
