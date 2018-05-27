import { connect } from 'react-redux';

import Input from '../components/Input';
import { addTodo } from '../actions';
import getVisibleTodos from './getVisibleTodos';

function mapStateToProps(state) {
  const { list } = state.lists;
  try {
    const listTodos = state.lists.lists[list].todos;
    return {
      inputBottomBorder: getVisibleTodos(listTodos, state.visibilityFilter).length !== 0,
    };
  } catch (e) {
    return {
      inputBottomBorder: false,
    };
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: text => dispatch(addTodo(text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);
