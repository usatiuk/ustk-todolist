import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { toggleTodo, removeTodo } from '../actions';

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
    onTodoClick: id => dispatch(toggleTodo(id)),
    handleDelete: id => dispatch(removeTodo(id)),
  };
}

const TodosContainer = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default TodosContainer;
